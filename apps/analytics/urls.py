from django.urls import path
from apps.analytics.views import (
    DashboardOverviewView,
    ActivityAuditLogListView
)

urlpatterns = [
    path('dashboard/', DashboardOverviewView.as_view(), name='analytics_dashboard'),
    path('audit-logs/', ActivityAuditLogListView.as_view(), name='analytics_audit_logs'),
]
