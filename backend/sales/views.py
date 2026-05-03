from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import SaleInvoice, SaleReturn, Payment
from .serializers import SaleInvoiceSerializer, SaleReturnSerializer, PaymentSerializer

class SaleInvoiceViewSet(viewsets.ModelViewSet):
    queryset = SaleInvoice.objects.all().order_by('-created_at')
    serializer_class = SaleInvoiceSerializer
    permission_classes = [IsAuthenticated]
    search_fields = ['invoice_number']
    filterset_fields = ['customer', 'status']

class SaleReturnViewSet(viewsets.ModelViewSet):
    queryset = SaleReturn.objects.all().order_by('-created_at')
    serializer_class = SaleReturnSerializer
    permission_classes = [IsAuthenticated]

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all().order_by('-created_at')
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['invoice_type', 'invoice_id']
