from tracker.api.filters import EventFilter
from tracker.api.pagination import TrackerPagination
from tracker.api.serializers import TalentSerializer
from tracker.api.views import (
    EventNestedMixin,
    FlatteningViewSetMixin,
    TrackerReadViewSet,
)

from tracker.models import Event
from tracker.api.serializers import EventSerializer


class EventViewSet(FlatteningViewSetMixin, TrackerReadViewSet):
    queryset = Event.objects
    serializer_class = EventSerializer
    pagination_class = TrackerPagination
    filter_backends = [EventFilter]

    def get_queryset(self):
        queryset = super().get_queryset()
        if not self.kwargs.get('skip_annotations', False):
            queryset = queryset.with_annotations()
        return queryset

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        with_totals = self.request.query_params.get('totals') is not None
        return serializer_class(*args, **kwargs, with_totals=with_totals)

