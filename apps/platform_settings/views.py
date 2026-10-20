from core.permissions import IsAdminRoleOrStaff
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.core.cache import cache
from apps.platform_settings.models import PlatformSetting, ContactMessage
from apps.platform_settings.serializers import PlatformSettingSerializer, ContactMessageSerializer

SETTINGS_CACHE_KEY = 'curio_platform_settings'
SETTINGS_CACHE_TIMEOUT = 86400  # 24 hours


class PlatformSettingView(generics.RetrieveUpdateAPIView):
    serializer_class = PlatformSettingSerializer

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH']:
            return [IsAdminRoleOrStaff()]
        return [permissions.AllowAny()]

    def get_object(self):
        return PlatformSetting.get_settings()

    def get(self, request, *args, **kwargs):
        cached_data = cache.get(SETTINGS_CACHE_KEY)
        if cached_data is not None:
            response = Response(cached_data)
            response['X-Cache'] = 'HIT'
            response['Cache-Control'] = 'public, max-age=60, stale-while-revalidate=300'
            return response

        instance = self.get_object()
        serializer = self.get_serializer(instance)
        cached_data = serializer.data
        cache.set(SETTINGS_CACHE_KEY, cached_data, SETTINGS_CACHE_TIMEOUT)

        response = Response(cached_data)
        response['X-Cache'] = 'MISS'
        response['Cache-Control'] = 'public, max-age=60, stale-while-revalidate=300'
        return response

    def perform_update(self, serializer):
        super().perform_update(serializer)
        cache.delete(SETTINGS_CACHE_KEY)


class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        message_obj = serializer.save()
        return Response({
            "message": "Thank you! Your message has been sent successfully. We will reply within 24 hours.",
            "data": ContactMessageSerializer(message_obj).data
        }, status=status.HTTP_201_CREATED)


class AdminContactMessageListView(generics.ListAPIView):
    queryset = ContactMessage.objects.all().order_by('-created_at')
    serializer_class = ContactMessageSerializer
    permission_classes = [IsAdminRoleOrStaff]
