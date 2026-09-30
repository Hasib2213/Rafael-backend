from django.urls import path
from apps.subscriptions.views import (
    PlanListView,
    AdminPlanDetailUpdateView,
    CheckoutProcessView,
    UserSubscriptionStatusView,
    BillingTransactionListView
)

urlpatterns = [
    path('plans/', PlanListView.as_view(), name='subscription_plan_list'),
    path('plans/<str:slug_or_id>/', AdminPlanDetailUpdateView.as_view(), name='subscription_plan_detail'),
    path('checkout/', CheckoutProcessView.as_view(), name='subscription_checkout'),
    path('my-status/', UserSubscriptionStatusView.as_view(), name='subscription_status'),
    path('transactions/', BillingTransactionListView.as_view(), name='subscription_transactions'),
]

