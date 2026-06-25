from django.db import models

# Create your models here.

class Home(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    cta_1 = models.CharField(max_length=100, default="View My Work")
    cta_2 = models.CharField(max_length=100, default="Let's Talk")
    image = models.ImageField(upload_to="home/")


class Project(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    short_description = models.TextField()  # for home page
    detailed_description = models.TextField()  # for detail page
    cta_text = models.CharField(max_length=100, default="View Project")
    image = models.ImageField(upload_to="projects/")
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title
    

class Service(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    detailed_description = models.TextField(blank=True, null=True)
    cta = models.CharField(max_length=100, default="Learn More")
    image = models.ImageField(upload_to="services/")
    def __str__(self):
        return self.title


class About(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()  # markdown content
    image = models.ImageField(upload_to="about/")

    def __str__(self):
        return self.title