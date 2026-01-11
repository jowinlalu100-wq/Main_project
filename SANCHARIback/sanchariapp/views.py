from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .models import Trip
from .serializers import UserSerializer, TripSerializer
from rest_framework import status
# REGISTER
@api_view(['GET','POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered"})
    return Response(serializer.errors)

# LOGIN
@api_view(['POST'])
def login(request):
    user = authenticate(
        username=request.data.get('username'),
        password=request.data.get('password')
    )
    if user:
        return Response({"message": "Login successful", "user_id": user.id})
    return Response({"error": "Invalid credentials"})

@api_view(["GET", "POST"])
def trip_list_create(request):
    if request.method == "GET":
        trips = Trip.objects.all()
        serializer = TripSerializer(trips, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = TripSerializer(
            data=request.data,
            context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

