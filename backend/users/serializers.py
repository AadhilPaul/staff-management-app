from rest_framework import serializers
from .models import MyUser

class UserSerializer(serializers.ModelSerializer):
    profile_pic = serializers.ImageField(use_url=True)

    class Meta:
        model = MyUser
        fields = ['id', 'username', 'email', 'role', 'phone_number', 'profile_pic']