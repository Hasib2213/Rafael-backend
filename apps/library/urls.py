from django.urls import path
from apps.library.views import (
    LibraryListView,
    ToggleSaveBriefingView,
    RemoveSavedItemView
)

urlpatterns = [
    path('', LibraryListView.as_view(), name='library_list'),
    path('toggle/<uuid:briefing_id>/', ToggleSaveBriefingView.as_view(), name='library_toggle_save'),
    path('<uuid:pk>/', RemoveSavedItemView.as_view(), name='library_remove_item'),
]
