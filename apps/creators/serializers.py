from rest_framework import serializers
from apps.creators.models import Creator, CreatorFollow


class CreatorSerializer(serializers.ModelSerializer):
    is_following = serializers.SerializerMethodField()

    class Meta:
        model = Creator
        fields = [
            'id', 'name', 'handle', 'channel_url', 'avatar_url',
            'initials', 'avatar_gradient', 'description',
            'video_count', 'subscriber_count', 'is_following',
            'created_at', 'updated_at'
        ]

    def get_is_following(self, obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return False
        return CreatorFollow.objects.filter(user=request.user, creator=obj).exists()


class AddCreatorByUrlSerializer(serializers.Serializer):
    url = serializers.URLField(required=True)
