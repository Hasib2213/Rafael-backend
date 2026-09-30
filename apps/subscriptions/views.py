from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import models
from django.utils import timezone
from datetime import timedelta
from apps.subscriptions.models import Plan, Subscription, BillingTransaction

from apps.subscriptions.serializers import (
    PlanSerializer,
    PlanAdminUpdateSerializer,
    SubscriptionSerializer,
    CheckoutProcessSerializer,
    BillingTransactionSerializer
)



class PlanListView(generics.ListCreateAPIView):
    queryset = Plan.objects.filter(is_active=True).order_by('price')
    serializer_class = PlanSerializer
    permission_classes = [permissions.AllowAny]


class AdminPlanDetailUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanAdminUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        lookup = self.kwargs.get('slug_or_id')
        try:
            return Plan.objects.get(pk=lookup)
        except (Plan.DoesNotExist, ValueError):
            return generics.get_object_or_404(Plan, slug=lookup)


class CheckoutProcessView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = CheckoutProcessSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        plan_id = data['plan_id']
        try:
            plan = Plan.objects.get(pk=plan_id)
        except (Plan.DoesNotExist, ValueError):
            plan = Plan.objects.filter(slug=plan_id.lower()).first()

        if not plan:
            return Response({"detail": "Selected plan not found."}, status=status.HTTP_404_NOT_FOUND)

        # Calculate expiration date
        now = timezone.now()
        if plan.billing_cycle == 'monthly':
            expires_at = now + timedelta(days=30)
        elif plan.billing_cycle == 'yearly':
            expires_at = now + timedelta(days=365)
        else:
            expires_at = None

        # Create or update user subscription
        subscription, _ = Subscription.objects.update_or_create(
            user=request.user,
            defaults={
                'plan': plan,
                'status': 'active',
                'expires_at': expires_at,
            }
        )

        # Update User plan field
        request.user.plan = plan.name
        request.user.save(update_fields=['plan'])

        # Record billing transaction
        card_num = data.get('card_number', '4242 5859 5684 2585')
        last4 = card_num.replace(' ', '')[-4:] if len(card_num) >= 4 else '2585'

        BillingTransaction.objects.create(
            user=request.user,
            plan=plan,
            first_name=data['first_name'],
            last_name=data['last_name'],
            phone=data.get('phone', ''),
            email=data['email'],
            country=data.get('country', 'Bangladesh'),
            address=data['address'],
            city=data.get('city', ''),
            state=data.get('state', ''),
            zip_code=data.get('zip_code', ''),
            additional_info=data.get('additional_info', ''),
            card_brand=data.get('card_brand', 'visa'),
            card_last4=last4,
            amount=plan.price,
            currency=plan.currency,
            is_success=True
        )

        return Response({
            "message": f"Payment and booking confirmed for {plan.name} plan!",
            "subscription": SubscriptionSerializer(subscription).data
        }, status=status.HTTP_201_CREATED)


class UserSubscriptionStatusView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        sub = Subscription.objects.filter(user=request.user, status='active').first()
        if not sub:
            free_plan, _ = Plan.objects.get_or_create(slug='free', defaults={'name': 'Free', 'price': 0})
            return Response({
                "plan": "Free",
                "status": "active",
                "expires_at": None,
                "plan_details": PlanSerializer(free_plan).data
            })
        return Response({
            "plan": sub.plan.name,
            "status": sub.status,
            "expires_at": sub.expires_at,
            "plan_details": PlanSerializer(sub.plan).data
        })


class BillingTransactionListView(generics.ListAPIView):
    serializer_class = BillingTransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = BillingTransaction.objects.all().select_related('plan', 'user')

        # If admin, can view all or filter by user_id
        if user.role == 'admin' or user.is_staff:
            user_id = self.request.query_params.get('user_id')
            if user_id:
                queryset = queryset.filter(user_id=user_id)
            search = self.request.query_params.get('search')
            if search:
                queryset = queryset.filter(
                    models.Q(first_name__icontains=search) |
                    models.Q(last_name__icontains=search) |
                    models.Q(email__icontains=search) |
                    models.Q(plan__name__icontains=search)
                )
            return queryset.order_by('-created_at')

        # Regular user can only see their own transactions
        return queryset.filter(user=user).order_by('-created_at')

