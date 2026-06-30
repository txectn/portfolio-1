from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    PortfolioLoginView,
    SiteSettingsViewSet,
    PageViewViewSet,
    VisitorLogViewSet,
    FooterViewSet
)



router = DefaultRouter()
router.register(
    r"site-settings",
    SiteSettingsViewSet,
    basename="site-settings"
)

router.register(
    r"page-views",
    PageViewViewSet,
    basename="page-view"
)

router.register(
    r"visitor-logs",
    VisitorLogViewSet,
    basename="visitor-log"
)

router.register(
    r"footer",
    FooterViewSet,
    basename="footer"
)

urlpatterns = [
    path("auth/", PortfolioLoginView.as_view(), name="portfolio-login"),
    path("", include(router.urls)),
]