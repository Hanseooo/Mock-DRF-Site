from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Item(models.Model):
    name = models.CharField(max_length=200)
    created = models.DateField(auto_now_add=True)

from django.db import models

class Announcement(models.Model):
    header = models.CharField(max_length=200)
    message = models.TextField()
    username = models.CharField(max_length=150, null=True, blank=True)  # allow empty temporarily
    created_at = models.DateTimeField(auto_now_add=True)

