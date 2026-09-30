from django.urls import path
from apps.platform_settings.views import (
    PlatformSettingView,
    ContactMessageCreateView,
    AdminContactMessageListView
)

urlpatterns = [
    path('', PlatformSettingView.as_view(), name='platform_settings_detail'),
    path('contact/', ContactMessageCreateView.as_view(), name='contact_message_create'),
    path('admin/contact-messages/', AdminContactMessageListView.as_view(), name='admin_contact_messages'),
]

