from django.db import models

# Create your models here.

class SiteSettings(models.Model):
    site_name = models.CharField(max_length=100)
    logo = models.ImageField(upload_to="logo/")
    favicon = models.ImageField(upload_to="favicon/")

    def __str__(self):
        return self.site_name
    

class PageView(models.Model):
    page = models.CharField(max_length=100, unique=True)
    views = models.PositiveIntegerField(default=0)

class VisitorLog(models.Model):
    page = models.CharField(max_length=100)
    ip_address = models.GenericIPAddressField()
    visited_at = models.DateTimeField(auto_now_add=True)