from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from django.core.cache import cache
from apps.library.models import SavedItem
from apps.briefings.models import Briefing
from apps.library.serializers import SavedItemSerializer

LIBRARY_CACHE_TIMEOUT = 900  # 15 minutes


def get_user_library_cache_key(user_id, search='', sort='recently', page=''):
    clean_search = (search or '').strip().lower()
    return f"curio_library_u{user_id}_s{clean_search}_o{sort}_p{page}"


def invalidate_user_library_cache(user_id):
    for s in ['', 'recently', 'oldest', 'a-z', 'z-a']:
        cache.delete(f"curio_library_u{user_id}_s_o{s}_p")
        cache.delete(f"curio_library_u{user_id}_s_o{s}_p1")
        cache.delete(f"curio_library_u{user_id}_s_o{s}_p2")
    cache.delete(f"curio_library_u{user_id}")


class LibraryListView(generics.ListAPIView):
    serializer_class = SavedItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        user = request.user
        search = request.query_params.get('search', '')
        sort = request.query_params.get('sort', 'recently')
        page = request.query_params.get('page', '')

        cache_key = get_user_library_cache_key(user.id, search, sort, page)
        cached_data = cache.get(cache_key)
        if cached_data is not None:
            response = Response(cached_data)
            response['X-Cache'] = 'HIT'
            response['Cache-Control'] = 'private, max-age=60, stale-while-revalidate=300'
            return response

        response = super().list(request, *args, **kwargs)
        cache.set(cache_key, response.data, LIBRARY_CACHE_TIMEOUT)
        response['X-Cache'] = 'MISS'
        response['Cache-Control'] = 'private, max-age=60, stale-while-revalidate=300'
        return response

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

        # Invalidate cache for this user
        invalidate_user_library_cache(request.user.id)

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

    def perform_destroy(self, instance):
        user_id = instance.user_id
        super().perform_destroy(instance)
        invalidate_user_library_cache(user_id)
