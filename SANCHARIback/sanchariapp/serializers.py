from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Trip


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = [
            "id",
            "traveler_name",
            "destination",
            "start_date",
            "end_date",
            "notes",
            "latitude", 
            "longitude", 

        ]

    def create(self, validated_data):
        request = self.context.get("request")
        user = request.user if request and request.user.is_authenticated else None
        return Trip.objects.create(user=user, **validated_data)
