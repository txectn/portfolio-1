from rest_framework import serializers
from .models import (
    Home,
    Project,
    Service,
    About
)

class HomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Home
        fields = "__all__"

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"

class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = "__all__"

