from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from apps.creators.models import Creator, CreatorFollow
from apps.creators.serializers import CreatorSerializer, AddCreatorByUrlSerializer


class CreatorListView(generics.ListCreateAPIView):
    serializer_class = CreatorSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Creator.objects.all()
        search = self.request.query_params.get('search')
        sort = self.request.query_params.get('sort', 'recently')

        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(handle__icontains=search) |
                Q(description__icontains=search)
            )

        if sort == 'recently':
            queryset = queryset.order_by('-created_at')
        elif sort == 'oldest':
            queryset = queryset.order_by('created_at')
        elif sort == 'a-z':
            queryset = queryset.order_by('name')
        elif sort == 'z-a':
            queryset = queryset.order_by('-name')

        return queryset


class CreatorDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Creator.objects.all()
    serializer_class = CreatorSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        lookup = self.kwargs.get('pk_or_handle', '').strip()
        import uuid
        try:
            uuid_obj = uuid.UUID(str(lookup))
            return Creator.objects.get(pk=uuid_obj)
        except (ValueError, TypeError, Creator.DoesNotExist):
            clean_handle = lookup if lookup.startswith('@') else f"@{lookup}"
            creator = Creator.objects.filter(
                Q(handle__iexact=clean_handle) |
                Q(handle__iexact=lookup) |
                Q(name__iexact=lookup)
            ).first()
            if not creator:
                from django.http import Http404
                raise Http404("Creator not found.")
            return creator


class FollowingCreatorsListView(generics.ListAPIView):
    serializer_class = CreatorSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        creator_ids = CreatorFollow.objects.filter(user=user).values_list('creator_id', flat=True)
        queryset = Creator.objects.filter(id__in=creator_ids)

        sort = self.request.query_params.get('sort', 'recently')
        if sort == 'recently':
            queryset = queryset.order_by('-created_at')
        elif sort == 'oldest':
            queryset = queryset.order_by('created_at')
        elif sort == 'a-z':
            queryset = queryset.order_by('name')
        elif sort == 'z-a':
            queryset = queryset.order_by('-name')

        return queryset


class FollowToggleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk, *args, **kwargs):
        import uuid
        try:
            uuid_obj = uuid.UUID(str(pk))
            creator = Creator.objects.get(pk=uuid_obj)
        except (ValueError, TypeError, Creator.DoesNotExist):
            clean_handle = pk if pk.startswith('@') else f"@{pk}"
            creator = Creator.objects.filter(
                Q(handle__iexact=clean_handle) |
                Q(handle__iexact=pk) |
                Q(name__iexact=pk)
            ).first()
            if not creator:
                return Response({"detail": "Creator not found."}, status=status.HTTP_404_NOT_FOUND)

        follow_obj = CreatorFollow.objects.filter(user=request.user, creator=creator).first()
        if follow_obj:
            follow_obj.delete()
            is_following = False
            message = f"Unfollowed {creator.name}."
        else:
            CreatorFollow.objects.create(user=request.user, creator=creator)
            is_following = True
            message = f"Now following {creator.name}!"

        return Response({
            "message": message,
            "is_following": is_following,
            "creator_id": str(creator.id)
        }, status=status.HTTP_200_OK)


class AddCreatorByUrlView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = AddCreatorByUrlSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        url = serializer.validated_data['url'].strip()

        from core.briefing_pipeline import process_add_creator
        creator, created = process_add_creator(request.user, url, run_background_briefing=True)

        return Response({
            "message": f"Channel {creator.name} added and followed successfully!",
            "creator": CreatorSerializer(creator, context={'request': request}).data
        }, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
