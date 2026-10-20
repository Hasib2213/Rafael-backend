import uuid
import logging
from datetime import timedelta
from django.core.cache import cache
from django.conf import settings
from django.db import models
from django.utils import timezone
from django.http import HttpResponseRedirect, HttpResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.subscriptions.models import Plan, Subscription, BillingTransaction
from apps.subscriptions.serializers import (
    PlanSerializer,
    PlanAdminUpdateSerializer,
    SubscriptionSerializer,
    CheckoutProcessSerializer,
    BillingTransactionSerializer
)
from apps.subscriptions.sslcommerz_service import (
    initiate_sslcommerz_payment,
    validate_sslcommerz_payment
)

logger = logging.getLogger(__name__)

PLANS_CACHE_KEY = 'curio_subscription_plans'
PLANS_CACHE_TIMEOUT = 86400  # 24 hours


class PlanListView(generics.ListCreateAPIView):
    queryset = Plan.objects.filter(is_active=True).order_by('price')
    serializer_class = PlanSerializer
    permission_classes = [permissions.AllowAny]

    def list(self, request, *args, **kwargs):
        if not request.query_params:
            cached_data = cache.get(PLANS_CACHE_KEY)
            if cached_data is not None:
                response = Response(cached_data)
                response['X-Cache'] = 'HIT'
                response['Cache-Control'] = 'no-cache, no-store, must-revalidate'
                return response

        response = super().list(request, *args, **kwargs)
        if not request.query_params:
            cache.set(PLANS_CACHE_KEY, response.data, PLANS_CACHE_TIMEOUT)
            response['X-Cache'] = 'MISS'
            response['Cache-Control'] = 'no-cache, no-store, must-revalidate'
        return response

    def perform_create(self, serializer):
        super().perform_create(serializer)
        cache.delete(PLANS_CACHE_KEY)


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

    def perform_update(self, serializer):
        super().perform_update(serializer)
        cache.delete(PLANS_CACHE_KEY)


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

        # 1. FREE PLAN HANDLER: Activate immediately without gateway
        if plan.price <= 0 or plan.slug == 'free':
            subscription, _ = Subscription.objects.update_or_create(
                user=request.user,
                defaults={
                    'plan': plan,
                    'status': 'active',
                    'expires_at': None,
                }
            )

            request.user.plan = plan.name
            request.user.save(update_fields=['plan'])

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
                card_brand='free',
                card_last4='0000',
                amount=0,
                currency=plan.currency,
                is_success=True,
                status='completed',
                payment_gateway='free'
            )

            return Response({
                "message": f"Free subscription activated successfully!",
                "subscription": SubscriptionSerializer(subscription).data
            }, status=status.HTTP_200_OK)

        # 2. PAID PLAN: Initiate payment with SSLCommerz (modular for other gateways later)
        gateway = data.get('payment_gateway', 'sslcommerz')
        tran_id = f"TXN_{uuid.uuid4().hex[:12].upper()}"

        card_num = data.get('card_number', '4242 5859 5684 2585')
        last4 = card_num.replace(' ', '')[-4:] if len(card_num) >= 4 else '2585'

        transaction = BillingTransaction.objects.create(
            user=request.user,
            plan=plan,
            tran_id=tran_id,
            payment_gateway=gateway,
            status='pending',
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
            card_brand=data.get('card_brand', 'sslcommerz'),
            card_last4=last4,
            amount=plan.price,
            currency=plan.currency,
            is_success=False
        )

        if gateway == 'sslcommerz':
            try:
                gateway_url = initiate_sslcommerz_payment(transaction, request.user, plan, data)
                return Response({
                    "message": "Payment session initiated.",
                    "checkout_url": gateway_url,
                    "tran_id": tran_id
                }, status=status.HTTP_200_OK)
            except Exception as e:
                logger.error(f"[Checkout] SSLCommerz initiation error: {e}")
                transaction.status = 'failed'
                transaction.save(update_fields=['status'])
                return Response({
                    "detail": f"Failed to initiate SSLCommerz payment: {str(e)}"
                }, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            "detail": f"Unsupported payment gateway: {gateway}"
        }, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def sslcommerz_success_view(request):
    """
    Handle SSLCommerz success callback (HTTP POST).
    Validates payment and activates user subscription.
    """
    frontend_url = getattr(settings, 'FRONTEND_URL', 'http://localhost:3000').rstrip('/')
    post_data = request.POST
    tran_id = post_data.get('tran_id')
    val_id = post_data.get('val_id')
    card_type = post_data.get('card_type', 'sslcommerz')
    card_no = post_data.get('card_no', '')

    if not tran_id or not val_id:
        return HttpResponseRedirect(f"{frontend_url}/checkout?status=failed&reason=missing_data")

    try:
        transaction = BillingTransaction.objects.get(tran_id=tran_id)
    except BillingTransaction.DoesNotExist:
        return HttpResponseRedirect(f"{frontend_url}/checkout?status=failed&reason=transaction_not_found")

    # Double validation via SSLCommerz validation API
    val_result = validate_sslcommerz_payment(val_id)
    val_status = val_result.get('status')

    if val_status in ['VALID', 'VALIDATED']:
        transaction.val_id = val_id
        transaction.status = 'completed'
        transaction.is_success = True
        transaction.card_brand = card_type
        if card_no and len(card_no) >= 4:
            transaction.card_last4 = card_no[-4:]
        transaction.save()

        # Activate user subscription
        plan = transaction.plan
        user = transaction.user
        now = timezone.now()
        if plan:
            if plan.billing_cycle == 'monthly':
                expires_at = now + timedelta(days=30)
            elif plan.billing_cycle == 'yearly':
                expires_at = now + timedelta(days=365)
            else:
                expires_at = None

            Subscription.objects.update_or_create(
                user=user,
                defaults={
                    'plan': plan,
                    'status': 'active',
                    'expires_at': expires_at,
                }
            )

            user.plan = plan.name
            user.save(update_fields=['plan'])

        # Invalidate admin dashboard cache so metrics update in real-time
        cache.delete('curio_admin_dashboard_overview')

        return HttpResponseRedirect(f"{frontend_url}/checkout?status=success&tran_id={tran_id}")
    else:
        transaction.status = 'failed'
        transaction.save(update_fields=['status'])
        return HttpResponseRedirect(f"{frontend_url}/checkout?status=failed&tran_id={tran_id}")


@csrf_exempt
def sslcommerz_fail_view(request):
    frontend_url = getattr(settings, 'FRONTEND_URL', 'http://localhost:3000').rstrip('/')
    tran_id = request.POST.get('tran_id')
    if tran_id:
        BillingTransaction.objects.filter(tran_id=tran_id).update(status='failed', is_success=False)
    return HttpResponseRedirect(f"{frontend_url}/checkout?status=failed&tran_id={tran_id or ''}")


@csrf_exempt
def sslcommerz_cancel_view(request):
    frontend_url = getattr(settings, 'FRONTEND_URL', 'http://localhost:3000').rstrip('/')
    tran_id = request.POST.get('tran_id')
    if tran_id:
        BillingTransaction.objects.filter(tran_id=tran_id).update(status='cancelled', is_success=False)
    return HttpResponseRedirect(f"{frontend_url}/checkout?status=cancelled&tran_id={tran_id or ''}")


@csrf_exempt
def sslcommerz_ipn_view(request):
    post_data = request.POST
    tran_id = post_data.get('tran_id')
    val_id = post_data.get('val_id')

    if tran_id and val_id:
        try:
            transaction = BillingTransaction.objects.get(tran_id=tran_id)
            if transaction.status != 'completed':
                val_result = validate_sslcommerz_payment(val_id)
                if val_result.get('status') in ['VALID', 'VALIDATED']:
                    transaction.val_id = val_id
                    transaction.status = 'completed'
                    transaction.is_success = True
                    transaction.save()

                    plan = transaction.plan
                    user = transaction.user
                    now = timezone.now()
                    expires_at = now + timedelta(days=30 if plan and plan.billing_cycle == 'monthly' else 365)
                    Subscription.objects.update_or_create(
                        user=user,
                        defaults={'plan': plan, 'status': 'active', 'expires_at': expires_at}
                    )
                    user.plan = plan.name
                    user.save(update_fields=['plan'])
                    cache.delete('curio_admin_dashboard_overview')
        except Exception as e:
            logger.error(f"[SSLCommerz IPN] Error: {e}")

    return HttpResponse("IPN OK", status=200)


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

        return queryset.filter(user=user).order_by('-created_at')
