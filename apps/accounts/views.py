import random
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.views import TokenObtainPairView
from django.db import models
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




class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "message": "User registered successfully!",
            "user": UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)


class CustomLoginView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CustomTokenObtainPairSerializer


class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return ProfileUpdateSerializer
        return UserSerializer


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
        return Response({"message": "Avatar removed successfully."}, status=status.HTTP_200_OK)



class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = request.user
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        return Response({"detail": "Password updated successfully."}, status=status.HTTP_200_OK)


class AdminUserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = User.objects.all().order_by('-date_joined')
        plan = self.request.query_params.get('plan')
        search = self.request.query_params.get('search')
        suspended = self.request.query_params.get('suspended')

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

        return queryset


class AdminUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return AdminUserUpdateSerializer
        return UserSerializer


class AdminSuspendUserToggleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

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

