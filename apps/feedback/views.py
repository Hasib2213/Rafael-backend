from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from django.core.cache import cache
from apps.feedback.models import Feedback
from apps.feedback.serializers import FeedbackSerializer, SubmitFeedbackSerializer

ADMIN_REVIEWS_CACHE_KEY = 'curio_admin_reviews_all'
ADMIN_REVIEWS_CACHE_TIMEOUT = 3600  # 1 hour
FEATURED_REVIEWS_CACHE_KEY = 'curio_featured_reviews'
FEATURED_REVIEWS_CACHE_TIMEOUT = 3600  # 1 hour


def invalidate_review_caches():
    cache.delete(ADMIN_REVIEWS_CACHE_KEY)
    cache.delete(FEATURED_REVIEWS_CACHE_KEY)


class UserFeedbackListView(generics.ListAPIView):
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Feedback.objects.filter(user=self.request.user).select_related('briefing', 'briefing__creator')


class SubmitFeedbackView(generics.CreateAPIView):
    serializer_class = SubmitFeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        feedback = serializer.save()
        invalidate_review_caches()
        return Response({
            "message": "Feedback submitted successfully! Thank you for helping us improve.",
            "feedback": FeedbackSerializer(feedback).data
        }, status=status.HTTP_201_CREATED)


class AdminReviewListView(generics.ListAPIView):
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Feedback.objects.all().select_related('user', 'briefing')
        featured = self.request.query_params.get('featured')
        search = self.request.query_params.get('search')

        if featured is not None:
            is_feat = featured.lower() in ['true', '1']
            queryset = queryset.filter(is_featured=is_feat)

        if search:
            queryset = queryset.filter(
                Q(user__first_name__icontains=search) |
                Q(user__last_name__icontains=search) |
                Q(user__email__icontains=search) |
                Q(thoughts__icontains=search) |
                Q(subtitle__icontains=search)
            )

        return queryset

    def list(self, request, *args, **kwargs):
        search = request.query_params.get('search')
        featured = request.query_params.get('featured')

        # Cache the primary unfiltered/default admin review list
        if not search and featured is None:
            cached_data = cache.get(ADMIN_REVIEWS_CACHE_KEY)
            if cached_data is not None:
                response = Response(cached_data)
                response['X-Cache'] = 'HIT'
                response['Cache-Control'] = 'no-cache, no-store, must-revalidate'
                return response

            response = super().list(request, *args, **kwargs)
            cache.set(ADMIN_REVIEWS_CACHE_KEY, response.data, ADMIN_REVIEWS_CACHE_TIMEOUT)
            response['X-Cache'] = 'MISS'
            response['Cache-Control'] = 'no-cache, no-store, must-revalidate'
            return response

        return super().list(request, *args, **kwargs)


class AdminToggleFeatureReviewView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk, *args, **kwargs):
        try:
            feedback = Feedback.objects.get(pk=pk)
            feedback.is_featured = not feedback.is_featured
            feedback.save(update_fields=['is_featured'])
            invalidate_review_caches()
            status_text = "featured" if feedback.is_featured else "unfeatured"
            return Response({
                "message": f"Review {status_text} successfully.",
                "is_featured": feedback.is_featured
            }, status=status.HTTP_200_OK)
        except Feedback.DoesNotExist:
            return Response({"detail": "Review not found."}, status=status.HTTP_404_NOT_FOUND)


class AdminDeleteReviewView(generics.DestroyAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_destroy(self, instance):
        super().perform_destroy(instance)
        invalidate_review_caches()


class FeaturedReviewListView(generics.ListAPIView):
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Feedback.objects.filter(is_featured=True).select_related('user', 'briefing').order_by('-created_at')

    def list(self, request, *args, **kwargs):
        cached_data = cache.get(FEATURED_REVIEWS_CACHE_KEY)
        if cached_data is not None:
            response = Response(cached_data)
            response['X-Cache'] = 'HIT'
            response['Cache-Control'] = 'no-cache, no-store, must-revalidate'
            return response

        response = super().list(request, *args, **kwargs)
        cache.set(FEATURED_REVIEWS_CACHE_KEY, response.data, FEATURED_REVIEWS_CACHE_TIMEOUT)
        response['X-Cache'] = 'MISS'
        response['Cache-Control'] = 'no-cache, no-store, must-revalidate'
        return response
