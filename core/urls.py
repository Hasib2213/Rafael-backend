from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # API endpoints
    path('api/auth/', include('apps.accounts.urls')),
    path('api/creators/', include('apps.creators.urls')),
    path('api/briefings/', include('apps.briefings.urls')),
    path('api/library/', include('apps.library.urls')),
    path('api/feedback/', include('apps.feedback.urls')),
    path('api/subscriptions/', include('apps.subscriptions.urls')),
    path('api/settings/', include('apps.platform_settings.urls')),
    path('api/analytics/', include('apps.analytics.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
