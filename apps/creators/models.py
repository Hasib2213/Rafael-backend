import uuid
from django.db import models
from django.conf import settings


class Creator(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    handle = models.CharField(max_length=100, unique=True)
    channel_url = models.URLField(max_length=500, blank=True)
    avatar_url = models.URLField(max_length=500, blank=True)
    initials = models.CharField(max_length=10, blank=True)
    avatar_gradient = models.CharField(max_length=100, default="bg-gradient-to-tr from-cyan-500 to-blue-600")
    description = models.TextField(blank=True)
    video_count = models.IntegerField(default=0)
    subscriber_count = models.CharField(max_length=50, default="0 subscribers")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.handle})"


class CreatorFollow(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='following_creators')
    creator = models.ForeignKey(Creator, on_delete=models.CASCADE, related_name='followers')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'creator')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.email} -> {self.creator.name}"
