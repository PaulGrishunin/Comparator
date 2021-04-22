from django_filters import rest_framework as filters
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from .models import Platform


class PaginationPlatform(PageNumberPagination):
    page_size = 10
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'results': data
        })


# class CharFilterInFilter(filters.BaseInFilter, filters.CharFilter):
#     pass


class PlatformFilter(filters.FilterSet):
    year = filters.RangeFilter()
    price = filters.RangeFilter()


    class Meta:
        model = Platform
        fields = [ 'year', 'price']
