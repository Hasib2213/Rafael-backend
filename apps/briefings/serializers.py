from rest_framework import serializers
from apps.briefings.models import Briefing
from apps.library.models import SavedItem


class BriefingSerializer(serializers.ModelSerializer):
    channel_name = serializers.CharField(source='creator.name', default='Curio Creator', read_only=True)
    channel_handle = serializers.CharField(source='creator.handle', default='', read_only=True)
    channel_avatar_color = serializers.CharField(source='creator.avatar_gradient', default='from-purple-600 to-indigo-600', read_only=True)
    channel_initials = serializers.CharField(source='creator.initials', default='C', read_only=True)
    subscribers = serializers.CharField(source='creator.subscriber_count', default='1M subscribers', read_only=True)
    is_saved = serializers.SerializerMethodField()

    class Meta:
        model = Briefing
        fields = [
            'id', 'title', 'youtube_url', 'duration', 'thumbnail_url',
            'channel_name', 'channel_handle', 'channel_avatar_color',
            'channel_initials', 'subscribers',
            'summary', 'full_summary', 'key_takeaways',
            'audio_url', 'timeframe', 'category',
            'is_saved', 'listens_count', 'saves_count', 'created_at'
        ]

    def get_is_saved(self, obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return False
        return SavedItem.objects.filter(user=request.user, briefing=obj).exists()
