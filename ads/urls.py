from django.conf import settings
from django.urls import path, include
from .views import (
    BrandsListView,
    PlatformListView,
    PlatformLView,
    PlatformDestroyView,
    Sale_avgView,
    Sale_avgDestroyView,
    FavoritesListView,
    FavoritesCreateView,
    FavoritesDeleteView
)
from ads import views

app_name = 'ads'

urlpatterns = [
    path('', views.new_home, name='index'),
    path('create/buy', views.create_platform_buy),            #collect data from buy_platform
    path('create/sale', views.create_platform_sale),          #collect data from sale_platform
    path('brands/', BrandsListView.as_view(), name='brands_list'),

    path('platform/', PlatformListView.as_view(), name='platform_list'),
    path('platforml/price_diff=<int:dif>', PlatformLView.as_view(), name='platform_list_filtered'),
    path('platform/delete', PlatformDestroyView.as_view(), name='platform_delete'),

    path('sale_avg/', Sale_avgView.as_view(), name='sale_avg'),
    path('sale_avg/create', views.create_sale_avg_examples, name='sale_avg_create_examples'),
    path('sale_avg/delete', Sale_avgDestroyView.as_view(), name='sale_avg_delete'),

    path('favorites', FavoritesListView.as_view(), name='favorites_list'),
    path('favorites/add/<int:pk>', FavoritesCreateView.as_view(), name='favorite_create'),
    path('favorites/delete/<int:pk>', FavoritesDeleteView.as_view(), name='favorites_delete'),
]

# if settings.DEBUG:
#     import debug_toolbar
#     urlpatterns = [
#         path('__debug__/', include(debug_toolbar.urls)),
#     ] + urlpatterns