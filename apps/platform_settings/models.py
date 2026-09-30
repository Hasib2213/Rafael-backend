import uuid
from django.db import models


class PlatformSetting(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Contact & Social info
    address = models.CharField(max_length=255, default="Dhaka, Bangladesh")
    email = models.EmailField(default="info@curio.com")
    mobile = models.CharField(max_length=50, default="+8801688148194")
    facebook = models.CharField(max_length=150, default="CurioAI", blank=True)
    x_profile = models.CharField(max_length=150, default="@CurioAI", blank=True)
    instagram = models.CharField(max_length=150, default="@curio.ai", blank=True)

    # Legal content
    terms_of_use = models.TextField(blank=True)
    privacy_policy = models.TextField(blank=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Platform Settings ({self.email})"

    @classmethod
    def get_settings(cls):
        obj, created = cls.objects.get_or_create(id="00000000-0000-0000-0000-000000000001")
        return obj


class ContactMessage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=150)
    email = models.EmailField(max_length=255)
    subject = models.CharField(max_length=255, blank=True)
    message = models.TextField()
    is_resolved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.email}) - {self.subject or 'Inquiry'}"

