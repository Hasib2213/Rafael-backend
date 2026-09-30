import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email address is required')
        email = self.normalize_email(email).lower()
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('role', 'admin')

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    PLAN_CHOICES = (
        ('Free', 'Free Member'),
        ('Pro', 'Pro Member'),
        ('Enterprise', 'Enterprise Member'),
    )

    ROLE_CHOICES = (
        ('user', 'User'),
        ('admin', 'Admin'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, max_length=255)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    phone = models.CharField(max_length=30, blank=True)
    address = models.CharField(max_length=255, blank=True)
    company = models.CharField(max_length=150, blank=True)
    position = models.CharField(max_length=150, blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    avatar_url = models.URLField(max_length=500, blank=True)

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    plan = models.CharField(max_length=20, choices=PLAN_CHOICES, default='Free')

    is_suspended = models.BooleanField(default=False)
    suspension_reason = models.TextField(blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        ordering = ['-date_joined']
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return f"{self.email} ({self.get_full_name() or self.role})"

    def get_full_name(self):
        full = f"{self.first_name} {self.last_name}".strip()
        return full or self.email.split('@')[0]

    def get_short_name(self):
        return self.first_name or self.email.split('@')[0]


class PasswordResetOTP(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=255)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def is_valid(self):
        now = timezone.now()
        # Valid for 10 minutes (600 seconds)
        return not self.is_used and (now - self.created_at).total_seconds() < 600

    def __str__(self):
        return f"OTP for {self.email}: {self.otp} (used: {self.is_used})"


class Notification(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications', null=True, blank=True)
    title = models.CharField(max_length=255)
    body = models.TextField()
    avatar_url = models.CharField(max_length=500, blank=True, default="/images/happy_user.png")
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.created_at.strftime('%Y-%m-%d %H:%M')})"

