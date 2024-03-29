from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import PermissionsMixin


class CustomUser(AbstractUser):
    fav_color = models.CharField(blank=True, max_length=120)
    nickname = models.CharField(blank=True, max_length=120)