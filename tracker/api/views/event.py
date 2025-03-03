from tracker.api.filters import EventFilter
from tracker.api.views import EventViewSet


class FilteringEventViewSet(EventViewSet):
    filter_backends = [EventFilter]
