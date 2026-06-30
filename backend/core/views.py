from .permissions import IsAdminOrReadOnly
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework import viewsets
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import PageView, VisitorLog, SiteSettings, Footer
from .serializers import PortfolioLoginSerializer, SiteSettingsSerializer, PageViewSerializer, VisitorLogSerializer, FooterSerializer

# Create your views here.

class PortfolioLoginView(TokenObtainPairView):
    serializer_class = PortfolioLoginSerializer
    permission_classes = [AllowAny]

    
class SiteSettingsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer
    permission_classes = [IsAdminOrReadOnly]


class FooterViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Footer.objects.all()
    serializer_class = FooterSerializer
    permission_classes = [IsAdminOrReadOnly]

class PageViewViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PageView.objects.all().order_by("-views")
    serializer_class = PageViewSerializer
    permission_classes = [IsAdminUser]


class VisitorLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = VisitorLog.objects.all().order_by("-visited_at")
    serializer_class = VisitorLogSerializer
    permission_classes = [IsAdminUser]