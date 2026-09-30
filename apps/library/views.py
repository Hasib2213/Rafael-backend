from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from apps.library.models import SavedItem
from apps.briefings.models import Briefing
from apps.library.serializers import SavedItemSerializer


class LibraryListView(generics.ListAPIView):
    serializer_class = SavedItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = SavedItem.objects.filter(user=user).select_related('briefing', 'briefing__creator')
        
        search = self.request.query_params.get('search')
        sort = self.request.query_params.get('sort', 'recently')

        if search:
            queryset = queryset.filter(
                Q(briefing__title__icontains=search) |
                Q(briefing__creator__name__icontains=search) |
                Q(briefing__summary__icontains=search)
            )

        if sort == 'recently':
            queryset = queryset.order_by('-saved_at')
        elif sort == 'oldest':
            queryset = queryset.order_by('saved_at')
        elif sort == 'a-z':
            queryset = queryset.order_by('briefing__title')
        elif sort == 'z-a':
            queryset = queryset.order_by('-briefing__title')

        return queryset


class ToggleSaveBriefingView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, briefing_id, *args, **kwargs):
        try:
            briefing = Briefing.objects.get(pk=briefing_id)
        except Briefing.DoesNotExist:
            return Response({"detail": "Briefing not found."}, status=status.HTTP_404_NOT_FOUND)

        saved_item = SavedItem.objects.filter(user=request.user, briefing=briefing).first()
        if saved_item:
            saved_item.delete()
            is_saved = False
            briefing.saves_count = max(0, briefing.saves_count - 1)
            briefing.save(update_fields=['saves_count'])
            message = "Removed from your library."
        else:
            SavedItem.objects.create(user=request.user, briefing=briefing)
            is_saved = True
            briefing.saves_count += 1
            briefing.save(update_fields=['saves_count'])
            message = "Saved to your library."

        return Response({
            "message": message,
            "is_saved": is_saved,
            "briefing_id": str(briefing.id)
        }, status=status.HTTP_200_OK)


class RemoveSavedItemView(generics.DestroyAPIView):
    serializer_class = SavedItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SavedItem.objects.filter(user=self.request.user)
