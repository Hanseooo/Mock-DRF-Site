from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Item
from django.contrib.auth.models import User
#from .serializers import ItemSerializer
from rest_framework import status
from django.contrib.auth import authenticate
from .serializers import UserSerializer
from .serializers import AnnouncementSerializer
from base.models import Announcement


# @api_view(['GET'])
# def getData(request):
#     #person = {'name': 'Hans', 'age': 21}
#     items = Item.objects.all()
#     serializer = ItemSerializer(items, many = True)
#     return Response(serializer.data)

@api_view(['POST'])
def addItem(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['GET'])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def register_user(request):
    data = request.data
    if User.objects.filter(username=data['username']).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
    user = User.objects.create_user(
        username=data['username'],
        password=data['password']
    )
    return Response({'message': 'User created', "username" : user.username}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login_user(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user is not None:
        return Response({"message": "Login successful", "username" : username}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(["GET"])
def get_announcements(request):
    announcements = Announcement.objects.all()
    serializer = AnnouncementSerializer(announcements, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def create_announcement(request):
    serializer = AnnouncementSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
def delete_announcement(request, pk):
    try:
        announcement = Announcement.objects.get(pk=pk)
    except Announcement.DoesNotExist:
        return Response(status=404)
    announcement.delete()
    return Response(status=204)

@api_view(['PUT'])
def update_announcement(request, pk):
    try:
        announcement = Announcement.objects.get(pk=pk)
    except Announcement.DoesNotExist:
        return Response(status=404)
    serializer = AnnouncementSerializer(announcement, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)