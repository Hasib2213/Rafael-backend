from django.urls import path
from apps.creators.views import (
    CreatorListView,
    CreatorDetailView,
    FollowingCreatorsListView,
    FollowToggleView,
    AddCreatorByUrlView
)

urlpatterns = [
    path('', CreatorListView.as_view(), name='creator_list'),
    path('following/', FollowingCreatorsListView.as_view(), name='creator_following_list'),
    path('add/', AddCreatorByUrlView.as_view(), name='creator_add_url'),
    path('<uuid:pk>/toggle-follow/', FollowToggleView.as_view(), name='creator_toggle_follow'),
    path('<str:pk_or_handle>/', CreatorDetailView.as_view(), name='creator_detail'),
]
