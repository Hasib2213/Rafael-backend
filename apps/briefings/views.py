from django.core.cache import cache

BRIEFINGS_FEED_CACHE_KEY_PREFIX = 'curio_feed_briefings'
BRIEFINGS_CACHE_TIMEOUT = 300  # 5 minutes


def get_briefings_cache_key(timeframe='', category='', creator_id='', search='', page=''):
    clean_search = (search or '').strip().lower()
    return f"{BRIEFINGS_FEED_CACHE_KEY_PREFIX}_tf{timeframe}_c{category}_cr{creator_id}_q{clean_search}_p{page}"


def invalidate_briefings_cache():
    for tf in ['', 'daily', 'weekly', 'both']:
        for cat in ['', 'ai', 'tech', 'business', 'all']:
            for p in ['', '1', '2']:
                cache.delete(f"{BRIEFINGS_FEED_CACHE_KEY_PREFIX}_tf{tf}_c{cat}_cr_q_p{p}")
                cache.delete(f"{BRIEFINGS_FEED_CACHE_KEY_PREFIX}_tf{tf}_c{cat}_cr__q_p{p}")
    cache.delete('curio_dashboard_overview')

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from apps.briefings.models import Briefing
from apps.briefings.serializers import BriefingSerializer


class BriefingListView(generics.ListCreateAPIView):
    serializer_class = BriefingSerializer
    permission_classes = [permissions.AllowAny]

    def list(self, request, *args, **kwargs):
        timeframe = request.query_params.get('timeframe', '')
        category = request.query_params.get('category', '')
        creator_id = request.query_params.get('creator_id', '')
        search = request.query_params.get('search', '')
        page = request.query_params.get('page', '')

        cache_key = get_briefings_cache_key(timeframe, category, creator_id, search, page)
        cached_data = cache.get(cache_key)
        if cached_data is not None:
            response = Response(cached_data)
            response['X-Cache'] = 'HIT'
            response['Cache-Control'] = 'public, max-age=60, stale-while-revalidate=300'
            return response

        response = super().list(request, *args, **kwargs)
        cache.set(cache_key, response.data, BRIEFINGS_CACHE_TIMEOUT)
        response['X-Cache'] = 'MISS'
        response['Cache-Control'] = 'public, max-age=60, stale-while-revalidate=300'
        return response

    def perform_create(self, serializer):
        super().perform_create(serializer)
        invalidate_briefings_cache()

    def get_queryset(self):
        queryset = Briefing.objects.all().select_related('creator')
        timeframe = self.request.query_params.get('timeframe')
        search = self.request.query_params.get('search')
        category = self.request.query_params.get('category')
        creator_id = self.request.query_params.get('creator_id')

        if timeframe == 'daily':
            queryset = queryset.filter(Q(timeframe='daily') | Q(timeframe='both'))
        elif timeframe == 'weekly':
            from django.utils import timezone
            from datetime import timedelta
            one_week_ago = timezone.now() - timedelta(days=7)
            queryset = queryset.filter(
                Q(timeframe='weekly') | Q(timeframe='both') | Q(created_at__gte=one_week_ago)
            )

        if category:
            queryset = queryset.filter(category__iexact=category)

        if creator_id:
            import uuid
            try:
                uuid_obj = uuid.UUID(str(creator_id))
                queryset = queryset.filter(creator_id=uuid_obj)
            except (ValueError, TypeError):
                clean_handle = creator_id if creator_id.startswith('@') else f"@{creator_id}"
                queryset = queryset.filter(
                    Q(creator__handle__iexact=clean_handle) |
                    Q(creator__handle__iexact=creator_id) |
                    Q(creator__name__icontains=creator_id)
                )

        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(summary__icontains=search) |
                Q(full_summary__icontains=search) |
                Q(creator__name__icontains=search)
            )

        return queryset


class BriefingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Briefing.objects.all().select_related('creator')
    serializer_class = BriefingSerializer
    permission_classes = [permissions.AllowAny]


class BriefingRecordListenView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, pk, *args, **kwargs):
        try:
            briefing = Briefing.objects.get(pk=pk)
            briefing.listens_count += 1
            briefing.save(update_fields=['listens_count'])
            return Response({"listens_count": briefing.listens_count}, status=status.HTTP_200_OK)
        except Briefing.DoesNotExist:
            return Response({"detail": "Briefing not found."}, status=status.HTTP_404_NOT_FOUND)



class BriefingSyncTriggerView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        import threading
        from core.briefing_pipeline import sync_all_creators_briefings

        # Run in thread so API responds instantly
        t = threading.Thread(
            target=sync_all_creators_briefings,
            kwargs={'max_videos_per_creator': 1},
            daemon=True
        )
        t.start()
        invalidate_briefings_cache()

        return Response({
            "message": "Automated channel sync started in background. New briefings will appear on feed momentarily."
        }, status=status.HTTP_200_OK)
