from django.contrib import admin
from .models import Home, Project, Service, About

# Register your models here.

@admin.register(Home)
class HomeAdmin(admin.ModelAdmin):
    list_display = ("title", "cta_1", "cta_2")
    search_fields = ("title",)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "created_at")
    search_fields = ("title",)
    prepopulated_fields = {"slug": ("title",)}
    list_filter = ("created_at",)


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "cta")
    search_fields = ("title",)
    prepopulated_fields = {"slug": ("title",)}


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ("title",)
    search_fields = ("title",)