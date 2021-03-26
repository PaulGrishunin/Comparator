from rest_framework import serializers
from .models import Users

class UsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = ('pk','username', 'email', 'password', 'create_time')