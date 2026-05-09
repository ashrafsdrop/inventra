from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import PurchaseOrder, PurchaseInvoice
from .serializers import PurchaseOrderSerializer, PurchaseInvoiceSerializer

class PurchaseOrderViewSet(viewsets.ModelViewSet):
    queryset = PurchaseOrder.objects.all().order_by('-created_at')
    serializer_class = PurchaseOrderSerializer
    permission_classes = [AllowAny]
    filterset_fields = ['supplier', 'status']

class PurchaseInvoiceViewSet(viewsets.ModelViewSet):
    queryset = PurchaseInvoice.objects.all().order_by('-created_at')
    serializer_class = PurchaseInvoiceSerializer
    permission_classes = [AllowAny]
    search_fields = ['invoice_number']
    filterset_fields = ['supplier', 'status']
