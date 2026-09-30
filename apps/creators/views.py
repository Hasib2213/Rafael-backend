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
        lookup = self.kwargs.get('pk_or_handle')
        try:
            return Creator.objects.get(pk=lookup)
        except (Creator.DoesNotExist, ValueError):
            clean_handle = lookup if lookup.startswith('@') else f"@{lookup}"
            return generics.get_object_or_404(Creator, handle__iexact=clean_handle)


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
        try:
            creator = Creator.objects.get(pk=pk)
        except Creator.DoesNotExist:
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

        # Parse channel name or handle from URL
        clean_handle = "@newcreator"
        name = "New Creator"
        if "@" in url:
            parts = url.split("@")
            clean_handle = "@" + parts[1].split("/")[0].split("?")[0]
            name = clean_handle.replace("@", "").replace(".", " ").title()
        elif "youtube.com/" in url:
            slug = url.split("youtube.com/")[1].split("/")[0].split("?")[0]
            clean_handle = f"@{slug.lower()}"
            name = slug.replace(".", " ").title()

        creator, created = Creator.objects.get_or_create(
            handle=clean_handle,
            defaults={
                'name': name,
                'channel_url': url,
                'avatar_url': "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
                'initials': name[:2].upper(),
                'description': f"Official YouTube channel for {name}. AI summaries and daily briefings synced automatically.",
                'subscriber_count': "1.2M subscribers",
                'video_count': 12,
            }
        )

        # Auto follow for the user who added it
        CreatorFollow.objects.get_or_create(user=request.user, creator=creator)

        return Response({
            "message": f"Channel {creator.name} added and followed successfully!",
            "creator": CreatorSerializer(creator, context={'request': request}).data
        }, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
