from rest_framework import serializers
from apps.subscriptions.models import Plan, Subscription, BillingTransaction


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = [
            'id', 'name', 'slug', 'price', 'currency', 'period',
            'billing_cycle', 'badge_text', 'is_popular', 'is_best_offer',
            'is_active', 'features', 'free_trial_days'
        ]


class PlanAdminUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = ['price', 'currency', 'features', 'is_best_offer', 'free_trial_days', 'is_popular', 'name']


class SubscriptionSerializer(serializers.ModelSerializer):
    plan_name = serializers.CharField(source='plan.name', read_only=True)
    price = serializers.DecimalField(source='plan.price', max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Subscription
        fields = ['id', 'plan', 'plan_name', 'price', 'status', 'start_date', 'expires_at', 'auto_renew']


class CheckoutProcessSerializer(serializers.Serializer):
    plan_id = serializers.CharField(required=True)
    first_name = serializers.CharField(required=True, max_length=150)
    last_name = serializers.CharField(required=True, max_length=150)
    phone = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField(required=True)
    
    country = serializers.CharField(default="Bangladesh")
    address = serializers.CharField(required=True)
    city = serializers.CharField(required=False, allow_blank=True)
    state = serializers.CharField(required=False, allow_blank=True)
    zip_code = serializers.CharField(required=False, allow_blank=True)
    additional_info = serializers.CharField(required=False, allow_blank=True)

    card_brand = serializers.CharField(default="visa")
    card_number = serializers.CharField(write_only=True, required=False, allow_blank=True)
    card_expiry = serializers.CharField(write_only=True, required=False, allow_blank=True)
    card_cvc = serializers.CharField(write_only=True, required=False, allow_blank=True)
    name_on_card = serializers.CharField(write_only=True, required=False, allow_blank=True)


class BillingTransactionSerializer(serializers.ModelSerializer):
    plan_name = serializers.CharField(source='plan.name', read_only=True, default='')
    subscription_type = serializers.SerializerMethodField()
    payment_date = serializers.SerializerMethodField()
    card_number = serializers.SerializerMethodField()
    formatted_amount = serializers.SerializerMethodField()

    class Meta:
        model = BillingTransaction
        fields = [
            'id', 'user', 'plan', 'plan_name', 'subscription_type',
            'first_name', 'last_name', 'email', 'phone',
            'country', 'address', 'city', 'state', 'zip_code',
            'card_brand', 'card_last4', 'card_number',
            'amount', 'formatted_amount', 'currency', 'is_success',
            'created_at', 'payment_date'
        ]
        read_only_fields = ['id', 'created_at']

    def get_subscription_type(self, obj):
        if obj.plan:
            cycle = "Monthly" if obj.plan.billing_cycle == 'monthly' else "Yearly"
            return f"{obj.plan.name}({cycle})"
        return "Free Member"

    def get_payment_date(self, obj):
        return obj.created_at.strftime("%I:%M %p, %b %d, %Y")

    def get_card_number(self, obj):
        return f"**** **** **** {obj.card_last4}"

    def get_formatted_amount(self, obj):
        return f"{obj.currency}{obj.amount}"

