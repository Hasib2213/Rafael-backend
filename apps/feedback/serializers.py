from rest_framework import serializers
from apps.feedback.models import Feedback


class FeedbackSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)
    user_avatar = serializers.SerializerMethodField()
    briefing_title = serializers.CharField(source='briefing.title', read_only=True, default='')
    thumbnail = serializers.CharField(source='briefing.thumbnail_url', read_only=True, default='')
    briefing_thumbnail = serializers.CharField(source='briefing.thumbnail_url', read_only=True, default='')
    duration = serializers.CharField(source='briefing.duration', read_only=True, default='')
    briefing_duration = serializers.CharField(source='briefing.duration', read_only=True, default='')
    channel_name = serializers.CharField(source='briefing.creator.name', read_only=True, default='Curio Creator')
    creator_name = serializers.CharField(source='briefing.creator.name', read_only=True, default='Curio Creator')
    audio_url = serializers.CharField(source='briefing.audio_url', read_only=True, default='')
    summary = serializers.CharField(source='briefing.summary', read_only=True, default='')
    full_summary = serializers.CharField(source='briefing.full_summary', read_only=True, default='')
    key_takeaways = serializers.JSONField(source='briefing.key_takeaways', read_only=True, default=list)

    def get_user_avatar(self, obj):
        if not obj.user:
            return ""
        if getattr(obj.user, 'avatar_url', None):
            return obj.user.avatar_url
        if getattr(obj.user, 'avatar', None):
            try:
                return obj.user.avatar.url
            except Exception:
                return str(obj.user.avatar)
        return ""

    class Meta:
        model = Feedback
        fields = [
            'id', 'briefing', 'briefing_title', 'thumbnail', 'briefing_thumbnail',
            'duration', 'briefing_duration', 'channel_name', 'creator_name',
            'audio_url', 'summary', 'full_summary', 'key_takeaways',
            'rating', 'useful_feedback', 'thoughts',
            'request_improved', 'request_option',
            'user_name', 'user_email', 'user_avatar', 'is_platform_review', 'is_featured',
            'subtitle', 'summary_tag', 'better_version_tag', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class SubmitFeedbackSerializer(serializers.ModelSerializer):
    briefing_id = serializers.CharField(required=False, allow_null=True, allow_blank=True)

    class Meta:
        model = Feedback
        fields = [
            'briefing_id', 'rating', 'useful_feedback', 'thoughts',
            'request_improved', 'is_platform_review', 'subtitle'
        ]

    def validate_briefing_id(self, value):
        if not value:
            return None
        import uuid
        try:
            val_uuid = uuid.UUID(str(value))
        except (ValueError, TypeError):
            return None
        from apps.briefings.models import Briefing
        if Briefing.objects.filter(id=val_uuid).exists():
            return val_uuid
        return None

    def create(self, validated_data):
        user = self.context['request'].user
        briefing_id = validated_data.pop('briefing_id', None)
        if briefing_id:
            from apps.briefings.models import Briefing
            if not Briefing.objects.filter(id=briefing_id).exists():
                briefing_id = None
        request_improved = validated_data.get('request_improved', False)
        request_option = "Request an improved version" if request_improved else "Feedback submitted"

        feedback = Feedback.objects.create(
            user=user,
            briefing_id=briefing_id,
            request_option=request_option,
            **validated_data
        )
        return feedback
