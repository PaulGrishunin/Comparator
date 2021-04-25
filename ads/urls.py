from django.urls import path
from .views import (
    BrandsListView,
    PlatformListView,
    PlatformLView,
    PlatformCreateView,
    PlatformDestroyView,
    Sale_avgView,
    FavoritesListView,
    FavoritesCreateView,
    FavoritesDeleteView
)
from ads import views

app_name = 'ads'

urlpatterns = [
    path('', views.index),
    path('create/', views.create),
    # path('platform/', views.platform),
    path('brands/', BrandsListView.as_view(), name='brands_list'),
    path('platform/', PlatformListView.as_view(), name='platform_list'),
    path('platforml/price_diff=<int:dif>', PlatformLView.as_view(), name='platform_list'),
    path('platform/add', PlatformCreateView.as_view(), name='platform_create'),
    path('platform/delete', PlatformDestroyView.as_view(), name='platform_delete'),
    path('sale_avg/', Sale_avgView.as_view(), name='sale_avg'),

    path('favorites/', FavoritesListView.as_view(), name='favorites_list'),
    path('favorites/add/', FavoritesCreateView.as_view(), name='favorite_create'),
    path('favorites/delete/<int:pk>', FavoritesDeleteView.as_view(), name='favorites_delete'),
    # path('users/', RegistrationAPIView.as_view()),
    # path('users/login/', LoginAPIView.as_view()),
    # path('users/hello/', HelloAPIView.as_view()),

]