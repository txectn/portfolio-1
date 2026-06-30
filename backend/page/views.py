from rest_framework.viewsets import ModelViewSet
from .models import Home, Project, Service, About
from .serializers import (
    HomeSerializer,
    ProjectSerializer,
    ServiceSerializer,
    AboutSerializer
)
from core.permissions import IsAdminOrReadOnly

# Create your views here.

class HomeViewSet(ModelViewSet):
    queryset = Home.objects.all()
    serializer_class = HomeSerializer
    permission_classes = [IsAdminOrReadOnly]


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = "slug"


class ServiceViewSet(ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAdminOrReadOnly]


class AboutViewSet(ModelViewSet):
    queryset = About.objects.all()
    serializer_class = AboutSerializer
    permission_classes = [IsAdminOrReadOnly]