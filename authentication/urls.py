from django.urls import path
from .views import (
    RegistrationAPIView, LoginAPIView, UserRetrieveUpdateAPIView
)

app_name = 'authentication'

urlpatterns = [
    path('user', UserRetrieveUpdateAPIView.as_view()),          # Get, Update user info, delete user
    path('auth/register', RegistrationAPIView.as_view()),       # Create new user
    path('auth/login', LoginAPIView.as_view()),                 # Get token

]