from rest_framework import serializers
from apps.feedback.models import Feedback


class FeedbackSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    user_email = serializers.CharField(source='user.email', read_only=True)
    briefing_title = serializers.CharField(source='briefing.title', read_only=True, default='')
    thumbnail = serializers.CharField(source='briefing.thumbnail_url', read_only=True, default='')
    duration = serializers.CharField(source='briefing.duration', read_only=True, default='')
    channel_name = serializers.CharField(source='briefing.creator.name', read_only=True, default='Curio Creator')

    class Meta:
        model = Feedback
        fields = [
            'id', 'briefing', 'briefing_title', 'thumbnail', 'duration',
            'channel_name', 'rating', 'useful_feedback', 'thoughts',
            'request_improved', 'request_option',
            'user_name', 'user_email', 'is_platform_review', 'is_featured',
            'subtitle', 'summary_tag', 'better_version_tag', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class SubmitFeedbackSerializer(serializers.ModelSerializer):
    briefing_id = serializers.UUIDField(required=False, allow_null=True)

    class Meta:
        model = Feedback
        fields = [
            'briefing_id', 'rating', 'useful_feedback', 'thoughts',
            'request_improved', 'is_platform_review', 'subtitle'
        ]

    def create(self, validated_data):
        user = self.context['request'].user
        briefing_id = validated_data.pop('briefing_id', None)
        request_improved = validated_data.get('request_improved', False)
        request_option = "Request an improved version" if request_improved else "Feedback submitted"

        feedback = Feedback.objects.create(
            user=user,
            briefing_id=briefing_id,
            request_option=request_option,
            **validated_data
        )
        return feedback
