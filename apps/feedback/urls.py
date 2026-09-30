from django.urls import path
from apps.feedback.views import (
    UserFeedbackListView,
    SubmitFeedbackView,
    AdminReviewListView,
    AdminToggleFeatureReviewView,
    AdminDeleteReviewView
)

urlpatterns = [
    path('my-feedback/', UserFeedbackListView.as_view(), name='user_feedback_list'),
    path('submit/', SubmitFeedbackView.as_view(), name='feedback_submit'),
    path('admin/reviews/', AdminReviewListView.as_view(), name='admin_review_list'),
    path('admin/reviews/<uuid:pk>/toggle-feature/', AdminToggleFeatureReviewView.as_view(), name='admin_review_toggle_feature'),
    path('admin/reviews/<uuid:pk>/', AdminDeleteReviewView.as_view(), name='admin_review_delete'),
]
