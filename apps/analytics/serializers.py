from rest_framework import serializers
from apps.analytics.models import ActivityAuditLog, UserLoginLocation


class ActivityAuditLogSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.get_full_name', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    plan = serializers.CharField(source='user.plan', read_only=True)
    avatar_url = serializers.SerializerMethodField()
    date_time = serializers.SerializerMethodField()
    ip_address = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()

    class Meta:
        model = ActivityAuditLog
        fields = [
            'id', 'name', 'email', 'plan', 'activity_type',
            'description', 'rating', 'date_time', 'created_at',
            'avatar_url', 'ip_address', 'location'
        ]

    def get_ip_address(self, obj):
        try:
            if hasattr(obj.user, 'location_profile') and obj.user.location_profile:
                return obj.user.location_profile.ip_address or '127.0.0.1'
        except Exception:
            pass
        return '127.0.0.1'

    def get_location(self, obj):
        try:
            if hasattr(obj.user, 'location_profile') and obj.user.location_profile:
                loc = obj.user.location_profile
                if loc.city and loc.country:
                    return f"{loc.city}, {loc.country}"
        except Exception:
            pass
        return 'Local'

    def get_avatar_url(self, obj):
        if hasattr(obj, 'user') and obj.user:
            if getattr(obj.user, 'avatar_url', None):
                return obj.user.avatar_url
            try:
                if getattr(obj.user, 'avatar', None) and obj.user.avatar:
                    return obj.user.avatar.url
            except Exception:
                pass
        return ''

    def get_date_time(self, obj):
        return obj.created_at.strftime("%d %b, %Y %I:%M %p")


class UserLoginLocationSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()
    email = serializers.CharField(source='user.email', read_only=True)
    plan = serializers.CharField(source='user.plan', read_only=True)
    role = serializers.CharField(source='user.role', read_only=True)
    avatar_url = serializers.CharField(source='user.avatar_url', read_only=True)
    date_time = serializers.SerializerMethodField()

    class Meta:
        model = UserLoginLocation
        fields = [
            'id', 'user_name', 'email', 'plan', 'role',
            'avatar_url', 'ip_address', 'city', 'region', 'country',
            'country_code', 'latitude', 'longitude', 'is_active_session',
            'last_login', 'date_time'
        ]

    def get_user_name(self, obj):
        name = obj.user.get_full_name()
        if not name:
            name = obj.user.email.split('@')[0].capitalize()
        return name

    def get_date_time(self, obj):
        return obj.last_login.strftime("%d %b, %Y %I:%M %p")
