from rest_framework import generics, permissions, status
from rest_framework.response import Response
from apps.platform_settings.models import PlatformSetting, ContactMessage
from apps.platform_settings.serializers import PlatformSettingSerializer, ContactMessageSerializer


class PlatformSettingView(generics.RetrieveUpdateAPIView):
    serializer_class = PlatformSettingSerializer

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_object(self):
        return PlatformSetting.get_settings()


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
    permission_classes = [permissions.IsAuthenticated]

