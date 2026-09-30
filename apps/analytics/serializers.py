from rest_framework import serializers
from apps.analytics.models import ActivityAuditLog


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
