from django.db import models
from core.models import TimeStampedModel

class Supplier(TimeStampedModel):
    name = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    payment_terms = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name
