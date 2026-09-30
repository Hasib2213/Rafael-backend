from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from apps.feedback.models import Feedback
from apps.feedback.serializers import FeedbackSerializer, SubmitFeedbackSerializer


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


class AdminToggleFeatureReviewView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk, *args, **kwargs):
        try:
            feedback = Feedback.objects.get(pk=pk)
            feedback.is_featured = not feedback.is_featured
            feedback.save(update_fields=['is_featured'])
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
