from core.permissions import IsAdminRoleOrStaff
import random
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.views import TokenObtainPairView
from django.db import models
from django.core.cache import cache
from django.contrib.auth import get_user_model
from apps.accounts.models import PasswordResetOTP, Notification
from core.cloudinary_utils import upload_image, delete_from_cloudinary
from apps.accounts.serializers import (
    UserSerializer,
    RegisterSerializer,
    CustomTokenObtainPairSerializer,
    ChangePasswordSerializer,
    ProfileUpdateSerializer,
    AdminUserUpdateSerializer,
    ForgotPasswordRequestSerializer,
    VerifyOTPSerializer,
    ResetPasswordSerializer,
    NotificationSerializer
)

User = get_user_model()





USER_PROFILE_CACHE_TIMEOUT = 900  # 15 minutes


def get_user_profile_cache_key(user_id):
    return f"curio_user_profile_u{user_id}"


def invalidate_user_profile_cache(user_id):
    cache.delete(get_user_profile_cache_key(user_id))

ADMIN_USERS_CACHE_KEY = 'curio_admin_users_all'
ADMIN_USERS_CACHE_TIMEOUT = 120  # 2 minutes TTL


def invalidate_admin_users_cache():
    cache.delete(ADMIN_USERS_CACHE_KEY)
    cache.delete('curio_dashboard_overview')


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Automatically log New User Registration in ActivityAuditLog
        try:
            from apps.analytics.models import ActivityAuditLog
            ActivityAuditLog.objects.create(
                user=user,
                activity_type='New User Registered',
                description=f"{user.get_full_name() or user.email} joined as {getattr(user, 'plan', 'Free') or 'Free'} member"
            )
            cache.delete('curio_admin_dashboard_overview')
        except Exception:
            pass

        return Response({
            "message": "User registered successfully!",
            "user": UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)


class CustomLoginView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            try:
                from apps.analytics.models import ActivityAuditLog
                user = User.objects.filter(email=request.data.get('email')).first()
                if user:
                    ActivityAuditLog.objects.create(
                        user=user,
                        activity_type='User Login',
                        description=f"{user.get_full_name() or user.email} logged in successfully"
                    )
                    cache.delete('curio_admin_dashboard_overview')
            except Exception:
                pass
        return response


class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return ProfileUpdateSerializer
        return UserSerializer

    def retrieve(self, request, *args, **kwargs):
        cache_key = get_user_profile_cache_key(request.user.id)
        cached_data = cache.get(cache_key)
        if cached_data is not None:
            response = Response(cached_data)
            response['X-Cache'] = 'HIT'
            response['Cache-Control'] = 'no-cache, no-store, must-revalidate'
            return response

        response = super().retrieve(request, *args, **kwargs)
        cache.set(cache_key, response.data, USER_PROFILE_CACHE_TIMEOUT)
        response['X-Cache'] = 'MISS'
        response['Cache-Control'] = 'no-cache, no-store, must-revalidate'
        return response

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        updated_instance = serializer.save()
        invalidate_user_profile_cache(updated_instance.id)
        invalidate_admin_users_cache()
        return Response(UserSerializer(updated_instance, context={'request': request}).data)


class AvatarUploadView(APIView):
    """Upload user avatar to Cloudinary."""
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        file = request.FILES.get('avatar')
        if not file:
            return Response(
                {"detail": "No avatar file provided. Send 'avatar' as form-data."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Validate file type
        allowed_types = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
        if file.content_type not in allowed_types:
            return Response(
                {"detail": f"Invalid file type '{file.content_type}'. Allowed: JPEG, PNG, WebP, GIF."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Validate file size (max 5MB)
        if file.size > 5 * 1024 * 1024:
            return Response(
                {"detail": "File size exceeds 5MB limit."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Upload to Cloudinary
            result = upload_image(
                file,
                folder='avatars',
                public_id=f"user_{request.user.id}",
                overwrite=True,
            )

            # Save the Cloudinary URL to user profile
            user = request.user
            user.avatar_url = result['secure_url']
            user.save(update_fields=['avatar_url'])
            invalidate_user_profile_cache(user.id)
            invalidate_admin_users_cache()

            return Response({
                "message": "Avatar uploaded successfully!",
                "avatar_url": result['secure_url'],
                "public_id": result['public_id'],
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"detail": f"Upload failed: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, *args, **kwargs):
        """Remove user avatar from Cloudinary."""
        user = request.user
        if user.avatar_url:
            try:
                public_id = f"rafael/avatars/user_{user.id}"
                delete_from_cloudinary(public_id, resource_type='image')
            except Exception:
                pass  # Don't fail if Cloudinary deletion fails

        user.avatar_url = ''
        user.save(update_fields=['avatar_url'])
        invalidate_user_profile_cache(user.id)
        invalidate_admin_users_cache()
        return Response({"message": "Avatar removed successfully."}, status=status.HTTP_200_OK)



class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = request.user
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        invalidate_user_profile_cache(user.id)
        return Response({"detail": "Password updated successfully."}, status=status.HTTP_200_OK)


from rest_framework.pagination import PageNumberPagination

class AdminUserPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class AdminUserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdminRoleOrStaff]
    pagination_class = AdminUserPagination

    def get_queryset(self):
        queryset = User.objects.all().order_by('-date_joined')
        plan = self.request.query_params.get('plan')
        search = self.request.query_params.get('search')
        suspended = self.request.query_params.get('suspended')
        role = self.request.query_params.get('role')

        if plan and plan.upper() != 'ALL':
            queryset = queryset.filter(plan__iexact=plan)
        if search:
            queryset = queryset.filter(
                models.Q(email__icontains=search) |
                models.Q(first_name__icontains=search) |
                models.Q(last_name__icontains=search)
            )
        if suspended is not None:
            is_susp = suspended.lower() in ['true', '1']
            queryset = queryset.filter(is_suspended=is_susp)
        if role:
            if role.lower() == 'admin':
                queryset = queryset.filter(
                    models.Q(role__iexact='admin') |
                    models.Q(is_staff=True) |
                    models.Q(is_superuser=True)
                )
            else:
                queryset = queryset.filter(role__iexact=role)

        return queryset

    def list(self, request, *args, **kwargs):
        search = request.query_params.get('search')
        plan = request.query_params.get('plan')
        suspended = request.query_params.get('suspended')
        role = request.query_params.get('role')
        page = request.query_params.get('page')
        page_size = request.query_params.get('page_size')

        # Cache only the primary default admin user list (unfiltered page 1)
        if not search and not plan and suspended is None and not role and (not page or page == '1') and not page_size:
            cached_data = cache.get(ADMIN_USERS_CACHE_KEY)
            if cached_data is not None:
                response = Response(cached_data)
                response['X-Cache'] = 'HIT'
                response['Cache-Control'] = 'no-cache, no-store, must-revalidate'
                return response

            response = super().list(request, *args, **kwargs)
            stats = {
                'total_subscribers': User.objects.count(),
                'free_users': User.objects.filter(plan__iexact='Free').count(),
                'pro_users': User.objects.filter(plan__iexact='Pro').count(),
                'enterprise_users': User.objects.filter(plan__iexact='Enterprise').count(),
            }
            if isinstance(response.data, dict):
                response.data['stats'] = stats

            cache.set(ADMIN_USERS_CACHE_KEY, response.data, ADMIN_USERS_CACHE_TIMEOUT)
            response['X-Cache'] = 'MISS'
            response['Cache-Control'] = 'no-cache, no-store, must-revalidate'
            return response

        response = super().list(request, *args, **kwargs)
        stats = {
            'total_subscribers': User.objects.count(),
            'free_users': User.objects.filter(plan__iexact='Free').count(),
            'pro_users': User.objects.filter(plan__iexact='Pro').count(),
            'enterprise_users': User.objects.filter(plan__iexact='Enterprise').count(),
        }
        if isinstance(response.data, dict):
            response.data['stats'] = stats
        response['Cache-Control'] = 'no-cache, no-store, must-revalidate'
        return response


class AdminUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminRoleOrStaff]

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return AdminUserUpdateSerializer
        return UserSerializer

    def perform_update(self, serializer):
        user = serializer.save()
        invalidate_user_profile_cache(user.id)
        invalidate_admin_users_cache()

    def perform_destroy(self, instance):
        invalidate_user_profile_cache(instance.id)
        super().perform_destroy(instance)
        invalidate_admin_users_cache()


class AdminSuspendUserToggleView(APIView):
    permission_classes = [IsAdminRoleOrStaff]

    def post(self, request, pk, *args, **kwargs):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        reason = request.data.get('reason', '')
        user.is_suspended = not user.is_suspended
        if user.is_suspended:
            user.suspension_reason = reason or "Suspended by administrator"
        else:
            user.suspension_reason = ""
        user.save()
        invalidate_user_profile_cache(user.id)
        invalidate_admin_users_cache()

        status_text = "suspended" if user.is_suspended else "reactivated"
        return Response({
            "message": f"User {user.email} successfully {status_text}.",
            "is_suspended": user.is_suspended,
            "suspension_reason": user.suspension_reason
        })


class ForgotPasswordView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = ForgotPasswordRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']

        # Invalidate any existing unused OTPs for this email
        PasswordResetOTP.objects.filter(email=email, is_used=False).update(is_used=True)

        # Generate a 6-digit OTP (e.g. 123456 or random digits)
        otp = f"{random.randint(100000, 999999)}"
        PasswordResetOTP.objects.create(email=email, otp=otp)

        return Response({
            "message": f"A 6-digit OTP code has been sent to {email}.",
            "email": email,
            "otp": otp,  # Included for development & testing convenience
            "expires_in_minutes": 10
        }, status=status.HTTP_200_OK)


class VerifyOTPView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = VerifyOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        otp = serializer.validated_data['otp']

        otp_record = PasswordResetOTP.objects.filter(email=email, otp=otp, is_used=False).first()
        if not otp_record or not otp_record.is_valid():
            return Response({
                "detail": "Invalid or expired OTP code. Please request a new code."
            }, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            "message": "OTP verified successfully. You may now reset your password.",
            "valid": True,
            "email": email
        }, status=status.HTTP_200_OK)


class ResetPasswordView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = ResetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        otp = serializer.validated_data['otp']
        new_password = serializer.validated_data['password']

        otp_record = PasswordResetOTP.objects.filter(email=email, otp=otp, is_used=False).first()
        if not otp_record or not otp_record.is_valid():
            return Response({
                "detail": "Invalid or expired OTP verification."
            }, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(email=email).first()
        if not user:
            return Response({
                "detail": "User not found."
            }, status=status.HTTP_404_NOT_FOUND)

        user.set_password(new_password)
        user.save()

        # Mark OTP as used
        otp_record.is_used = True
        otp_record.save()

        return Response({
            "message": "Password has been reset successfully. You can now login with your new credentials."
        }, status=status.HTTP_200_OK)


class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Notification.objects.filter(
                models.Q(user=self.request.user) | models.Q(user__isnull=True)
            ).order_by('-created_at')
        return Notification.objects.filter(user__isnull=True).order_by('-created_at')


class NotificationMarkReadView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk, *args, **kwargs):
        try:
            notification = Notification.objects.get(pk=pk)
            notification.is_read = True
            notification.save()
            return Response({"message": "Notification marked as read.", "is_read": True})
        except Notification.DoesNotExist:
            return Response({"detail": "Notification not found."}, status=status.HTTP_404_NOT_FOUND)


class NotificationMarkAllReadView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        Notification.objects.filter(
            models.Q(user=request.user) | models.Q(user__isnull=True)
        ).update(is_read=True)
        return Response({"message": "All notifications marked as read."})

