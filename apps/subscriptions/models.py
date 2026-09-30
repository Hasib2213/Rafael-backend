import uuid
from django.db import models
from django.conf import settings


class Plan(models.Model):
    CYCLE_CHOICES = (
        ('monthly', 'Monthly'),
        ('yearly', 'Yearly'),
        ('forever', 'Lifetime/Forever'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    currency = models.CharField(max_length=10, default="$")
    period = models.CharField(max_length=50, default="/per month")
    billing_cycle = models.CharField(max_length=20, choices=CYCLE_CHOICES, default='monthly')
    badge_text = models.CharField(max_length=50, blank=True)
    
    is_popular = models.BooleanField(default=False)
    is_best_offer = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    features = models.JSONField(default=list, help_text="List of feature bullet points")
    free_trial_days = models.PositiveIntegerField(default=3)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['price']

    def __str__(self):
        return f"{self.name} ({self.currency}{self.price} {self.period})"


class Subscription(models.Model):
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('trial', 'Trial'),
        ('cancelled', 'Cancelled'),
        ('expired', 'Expired'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='subscriptions')
    plan = models.ForeignKey(Plan, on_delete=models.PROTECT, related_name='subscribers')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    
    start_date = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    auto_renew = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.email} - {self.plan.name} ({self.status})"


class BillingTransaction(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='billing_transactions')
    plan = models.ForeignKey(Plan, on_delete=models.SET_NULL, null=True, blank=True)
    
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    phone = models.CharField(max_length=50, blank=True)
    email = models.EmailField(max_length=255)
    
    country = models.CharField(max_length=100, default="Bangladesh")
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    zip_code = models.CharField(max_length=30, blank=True)
    additional_info = models.TextField(blank=True)

    card_brand = models.CharField(max_length=50, default="visa")
    card_last4 = models.CharField(max_length=10, default="2585")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default="$")
    is_success = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.email} - {self.currency}{self.amount} ({self.created_at.strftime('%Y-%m-%d')})"
