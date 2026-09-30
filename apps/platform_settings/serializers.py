from rest_framework import serializers
from apps.platform_settings.models import PlatformSetting, ContactMessage


class PlatformSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlatformSetting
        fields = [
            'id', 'address', 'email', 'mobile',
            'facebook', 'x_profile', 'instagram',
            'terms_of_use', 'privacy_policy', 'updated_at'
        ]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'is_resolved', 'created_at']
        read_only_fields = ['id', 'is_resolved', 'created_at']

