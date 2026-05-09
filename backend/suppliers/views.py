from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Supplier
from .serializers import SupplierSerializer

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all().order_by('-created_at')
    serializer_class = SupplierSerializer
    permission_classes = [AllowAny]
    search_fields = ['name', 'email', 'phone', 'city', 'country']
    ordering_fields = ['name', 'created_at']
