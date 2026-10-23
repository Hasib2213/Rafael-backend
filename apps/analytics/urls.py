from django.urls import path
from apps.analytics.views import (
    DashboardOverviewView,
    ActivityAuditLogListView,
    UserLoginLocationListView,
)

urlpatterns = [
    path('dashboard/', DashboardOverviewView.as_view(), name='analytics_dashboard'),
    path('audit-logs/', ActivityAuditLogListView.as_view(), name='analytics_audit_logs'),
    path('user-locations/', UserLoginLocationListView.as_view(), name='analytics_user_locations'),
]
