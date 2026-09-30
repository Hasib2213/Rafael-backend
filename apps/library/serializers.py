from rest_framework import serializers
from apps.library.models import SavedItem
from apps.briefings.serializers import BriefingSerializer


class SavedItemSerializer(serializers.ModelSerializer):
    briefing = BriefingSerializer(read_only=True)
    briefing_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = SavedItem
        fields = ['id', 'briefing', 'briefing_id', 'saved_at']
        read_only_fields = ['id', 'saved_at']

    def create(self, validated_data):
        user = self.context['request'].user
        briefing_id = validated_data.pop('briefing_id')
        saved_item, _ = SavedItem.objects.get_or_create(user=user, briefing_id=briefing_id)
        return saved_item
