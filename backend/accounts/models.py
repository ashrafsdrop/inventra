from django.contrib.auth.models import AbstractUser
from django.db import models
from core.models import TimeStampedModel

class User(AbstractUser, TimeStampedModel):
    role = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.username
