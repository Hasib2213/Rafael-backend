import uuid
from django.db import models
from django.conf import settings
from apps.briefings.models import Briefing


class Feedback(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='feedbacks')
    briefing = models.ForeignKey(Briefing, on_delete=models.SET_NULL, null=True, blank=True, related_name='feedbacks')
    
    rating = models.IntegerField(default=5, help_text="Rating 1 to 5")
    useful_feedback = models.CharField(max_length=200, blank=True, help_text="e.g. Very clear, Confusing or unclear")
    thoughts = models.TextField(blank=True, help_text="User comments or thoughts")
    
    request_improved = models.BooleanField(default=False)
    request_option = models.CharField(max_length=150, default="Feedback submitted")
    
    # Platform Review fields for Admin User Reviews page
    is_platform_review = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    subtitle = models.CharField(max_length=255, blank=True)
    summary_tag = models.CharField(max_length=100, default="Great summary")
    better_version_tag = models.CharField(max_length=100, default="Generate a better version")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.email} - {self.rating} Stars ({self.useful_feedback})"
