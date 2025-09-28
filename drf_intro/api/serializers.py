from rest_framework import serializers
#from base.models import Item
from django.contrib.auth.models import User
from base.models import Announcement


# class ItemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Item
#         fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username'] 

from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import Announcement


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = ['id', 'username', 'header', 'message', 'created_at']