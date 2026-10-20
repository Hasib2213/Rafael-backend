from django.urls import path
from apps.subscriptions.views import (
    PlanListView,
    AdminPlanDetailUpdateView,
    CheckoutProcessView,
    UserSubscriptionStatusView,
    BillingTransactionListView,
    sslcommerz_success_view,
    sslcommerz_fail_view,
    sslcommerz_cancel_view,
    sslcommerz_ipn_view,
)

urlpatterns = [
    path('plans/', PlanListView.as_view(), name='subscription_plan_list'),
    path('plans/<str:slug_or_id>/', AdminPlanDetailUpdateView.as_view(), name='subscription_plan_detail'),
    path('checkout/', CheckoutProcessView.as_view(), name='subscription_checkout'),
    path('my-status/', UserSubscriptionStatusView.as_view(), name='subscription_status'),
    path('transactions/', BillingTransactionListView.as_view(), name='subscription_transactions'),

    # SSLCommerz callback endpoints
    path('sslcommerz/success/', sslcommerz_success_view, name='sslcommerz_success'),
    path('sslcommerz/fail/', sslcommerz_fail_view, name='sslcommerz_fail'),
    path('sslcommerz/cancel/', sslcommerz_cancel_view, name='sslcommerz_cancel'),
    path('sslcommerz/ipn/', sslcommerz_ipn_view, name='sslcommerz_ipn'),
]
