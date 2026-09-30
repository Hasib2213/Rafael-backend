from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from apps.accounts.views import (
    RegisterView,
    CustomLoginView,
    UserProfileView,
    ChangePasswordView,
    ForgotPasswordView,
    VerifyOTPView,
    ResetPasswordView,
    NotificationListView,
    NotificationMarkReadView,
    NotificationMarkAllReadView,
    AdminUserListView,
    AdminUserDetailView,
    AdminSuspendUserToggleView,
)

urlpatterns = [
    # Auth endpoints
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('login/', CustomLoginView.as_view(), name='auth_login'),
    path('refresh/', TokenRefreshView.as_view(), name='auth_refresh'),
    path('profile/', UserProfileView.as_view(), name='auth_profile'),
    path('change-password/', ChangePasswordView.as_view(), name='auth_change_password'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='auth_forgot_password'),
    path('verify-otp/', VerifyOTPView.as_view(), name='auth_verify_otp'),
    path('reset-password/', ResetPasswordView.as_view(), name='auth_reset_password'),

    # Notification endpoints
    path('notifications/', NotificationListView.as_view(), name='notification_list'),
    path('notifications/<uuid:pk>/read/', NotificationMarkReadView.as_view(), name='notification_mark_read'),
    path('notifications/mark-all-read/', NotificationMarkAllReadView.as_view(), name='notification_mark_all_read'),

    # Admin User Management endpoints
    path('admin/users/', AdminUserListView.as_view(), name='admin_users_list'),
    path('admin/users/<uuid:pk>/', AdminUserDetailView.as_view(), name='admin_user_detail'),
    path('admin/users/<uuid:pk>/suspend/', AdminSuspendUserToggleView.as_view(), name='admin_user_suspend'),
]

