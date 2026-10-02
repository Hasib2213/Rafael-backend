from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from apps.briefings.models import Briefing
from apps.briefings.serializers import BriefingSerializer


class BriefingListView(generics.ListCreateAPIView):
    serializer_class = BriefingSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Briefing.objects.all().select_related('creator')
        timeframe = self.request.query_params.get('timeframe')
        search = self.request.query_params.get('search')
        category = self.request.query_params.get('category')
        creator_id = self.request.query_params.get('creator_id')

        if timeframe in ['daily', 'weekly']:
            queryset = queryset.filter(Q(timeframe=timeframe) | Q(timeframe='both'))

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

