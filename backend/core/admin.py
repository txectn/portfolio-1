from django.contrib import admin
from .models import SiteSettings, PageView, VisitorLog


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ("site_name",)
    search_fields = ("site_name",)


@admin.register(PageView)
class PageViewAdmin(admin.ModelAdmin):
    list_display = ("page", "views")
    search_fields = ("page",)
    ordering = ("-views",)


@admin.register(VisitorLog)
class VisitorLogAdmin(admin.ModelAdmin):
    list_display = ("page", "ip_address", "visited_at")
    search_fields = ("page", "ip_address")
    list_filter = ("page", "visited_at")
    ordering = ("-visited_at",)