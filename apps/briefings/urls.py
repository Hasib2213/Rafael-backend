from django.urls import path
from apps.briefings.views import (
    BriefingListView,
    BriefingDetailView,
    BriefingRecordListenView
)

urlpatterns = [
    path('', BriefingListView.as_view(), name='briefing_list'),
    path('<uuid:pk>/', BriefingDetailView.as_view(), name='briefing_detail'),
    path('<uuid:pk>/listen/', BriefingRecordListenView.as_view(), name='briefing_listen'),
]
