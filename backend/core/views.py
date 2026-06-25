from .permissions import IsAdminOrReadOnly
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework import viewsets
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import PageView, VisitorLog, SiteSettings
from .serializers import PortfolioLoginSerializer, SiteSettingsSerializer, PageViewSerializer, VisitorLogSerializer

# Create your views here.

class PortfolioLoginView(TokenObtainPairView):
    serializer_class = PortfolioLoginSerializer
    permission_classes = [AllowAny]

    
class SiteSettingsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer
    permission_classes = [IsAdminOrReadOnly]


class PageViewViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Admin-only page view statistics.
    """

    queryset = PageView.objects.all().order_by("-views")
    serializer_class = PageViewSerializer
    permission_classes = [IsAdminUser]


class VisitorLogViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Admin-only visitor logs.
    """

    queryset = VisitorLog.objects.all().order_by("-visited_at")
    serializer_class = VisitorLogSerializer
    permission_classes = [IsAdminUser]