import uuid
from django.db import models
from apps.creators.models import Creator


class Briefing(models.Model):
    TIMEFRAME_CHOICES = (
        ('daily', 'Daily Briefing'),
        ('weekly', 'Weekly Digest'),
        ('both', 'Both Daily & Weekly'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    creator = models.ForeignKey(Creator, on_delete=models.CASCADE, related_name='briefings', null=True, blank=True)
    title = models.CharField(max_length=300)
    youtube_url = models.URLField(max_length=500, blank=True)
    duration = models.CharField(max_length=20, default="10:00")
    thumbnail_url = models.URLField(max_length=500, blank=True)
    
    # AI Summaries
    summary = models.TextField(help_text="Short teaser/recap summary")
    full_summary = models.TextField(help_text="Full detailed breakdown")
    key_takeaways = models.JSONField(default=list, help_text="List of key points")

    # Audio synthesis
    audio_url = models.URLField(max_length=500, blank=True)
    audio_file = models.FileField(upload_to='audio_briefings/', null=True, blank=True)

    # Classification
    timeframe = models.CharField(max_length=20, choices=TIMEFRAME_CHOICES, default='daily')
    category = models.CharField(max_length=100, default='General')

    # Metrics
    listens_count = models.PositiveIntegerField(default=0)
    saves_count = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
