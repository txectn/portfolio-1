from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    HomeViewSet,
    ProjectViewSet,
    ServiceViewSet,
    AboutViewSet
)

router = DefaultRouter()

router.register(r"home", HomeViewSet)
router.register(r"projects", ProjectViewSet)
router.register(r"services", ServiceViewSet)
router.register(r"about", AboutViewSet)

urlpatterns = [
    path("", include(router.urls)),
]