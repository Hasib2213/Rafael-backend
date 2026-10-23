from rest_framework import serializers
from apps.analytics.models import ActivityAuditLog, UserLoginLocation


class ActivityAuditLogSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.get_full_name', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    plan = serializers.CharField(source='user.plan', read_only=True)
    date_time = serializers.SerializerMethodField()

    class Meta:
        model = ActivityAuditLog
        fields = [
            'id', 'name', 'email', 'plan', 'activity_type',
            'description', 'rating', 'date_time', 'created_at'
        ]

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
