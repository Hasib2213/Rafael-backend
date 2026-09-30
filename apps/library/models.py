import uuid
from django.db import models
from django.conf import settings
from apps.briefings.models import Briefing


class SavedItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='library_items')
    briefing = models.ForeignKey(Briefing, on_delete=models.CASCADE, related_name='saved_by_users')
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'briefing')
        ordering = ['-saved_at']

    def __str__(self):
        return f"{self.user.email} saved {self.briefing.title}"
