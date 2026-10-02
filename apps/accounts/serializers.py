from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='get_full_name', read_only=True)
    following_count = serializers.SerializerMethodField()
    saved_briefings_count = serializers.SerializerMethodField()
    feedback_count = serializers.SerializerMethodField()
    recent_transactions = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'last_name', 'full_name',
            'phone', 'address', 'company', 'position',
            'avatar', 'avatar_url', 'role', 'plan',
            'is_suspended', 'suspension_reason', 'is_staff', 'date_joined',
            'following_count', 'saved_briefings_count', 'feedback_count', 'recent_transactions'
        ]
        read_only_fields = ['id', 'role', 'is_staff', 'date_joined']

    def get_following_count(self, obj):
        return obj.following_creators.count() if hasattr(obj, 'following_creators') else 0

    def get_saved_briefings_count(self, obj):
        return obj.library_items.count() if hasattr(obj, 'library_items') else 0

    def get_feedback_count(self, obj):
        return obj.feedbacks.count() if hasattr(obj, 'feedbacks') else 0

    def get_recent_transactions(self, obj):
        from apps.subscriptions.serializers import BillingTransactionSerializer
        if hasattr(obj, 'billing_transactions'):
            txs = obj.billing_transactions.all().order_by('-created_at')[:5]
            return BillingTransactionSerializer(txs, many=True).data
        return []

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.avatar:
            try:
                url = instance.avatar.url
                data['avatar'] = url
                if not data.get('avatar_url'):
                    data['avatar_url'] = url
            except Exception:
                pass
        elif instance.avatar_url:
            data['avatar'] = instance.avatar_url
        return data



class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    confirm_password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password', 'confirm_password']

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
        )
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        if self.user.is_suspended:
            raise serializers.ValidationError({"detail": f"Account is suspended: {self.user.suspension_reason or 'Contact support'}"})
        
        data['user'] = UserSerializer(self.user).data
        return data


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, min_length=6)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is not correct.")
        return value


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'phone', 'address', 'company', 'position', 'avatar']

    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)
        if instance.avatar:
            try:
                cloudinary_url = instance.avatar.url
                if instance.avatar_url != cloudinary_url:
                    instance.avatar_url = cloudinary_url
                    instance.save(update_fields=['avatar_url'])
            except Exception:
                pass
        return instance


class AdminUserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['is_suspended', 'suspension_reason', 'plan', 'role']


class ForgotPasswordRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate_email(self, value):
        normalized = value.strip().lower()
        if not User.objects.filter(email=normalized).exists():
            raise serializers.ValidationError("No account found with this email address.")
        return normalized


class VerifyOTPSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    otp = serializers.CharField(required=True, max_length=6)

    def validate_email(self, value):
        return value.strip().lower()


class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    otp = serializers.CharField(required=True, max_length=6)
    password = serializers.CharField(required=True, min_length=6)
    confirm_password = serializers.CharField(required=True, min_length=6)

    def validate_email(self, value):
        return value.strip().lower()

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return attrs


class NotificationSerializer(serializers.ModelSerializer):
    time_ago = serializers.SerializerMethodField()

    class Meta:
        from apps.accounts.models import Notification
        model = Notification
        fields = ['id', 'title', 'body', 'avatar_url', 'is_read', 'created_at', 'time_ago']
        read_only_fields = ['id', 'created_at']

    def get_time_ago(self, obj):
        from django.utils import timezone
        diff = timezone.now() - obj.created_at
        seconds = int(diff.total_seconds())
        if seconds < 60:
            return "just now"
        elif seconds < 3600:
            minutes = seconds // 60
            return f"{minutes} min{'s' if minutes > 1 else ''} ago"
        elif seconds < 86400:
            hours = seconds // 3600
            return f"{hours} hour{'s' if hours > 1 else ''} ago"
        else:
            days = seconds // 86400
            return f"{days} day{'s' if days > 1 else ''} ago"

