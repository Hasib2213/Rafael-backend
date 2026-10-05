from django.urls import path
from apps.briefings.views import (
    BriefingListView,
    BriefingDetailView,
    BriefingRecordListenView,
    BriefingSyncTriggerView
)

urlpatterns = [
    path('', BriefingListView.as_view(), name='briefing_list'),
    path('sync/', BriefingSyncTriggerView.as_view(), name='briefing_sync'),
    path('<uuid:pk>/', BriefingDetailView.as_view(), name='briefing_detail'),
    path('<uuid:pk>/listen/', BriefingRecordListenView.as_view(), name='briefing_listen'),
]
