from django.urls import path
from .views import (
    RegistrationAPIView, LoginAPIView, UserRetrieveUpdateAPIView
)

app_name = 'authentication'

urlpatterns = [
    path('user/', UserRetrieveUpdateAPIView.as_view()),
    path('users/', RegistrationAPIView.as_view()),      # Create new user
    path('users/login/', LoginAPIView.as_view()),

]