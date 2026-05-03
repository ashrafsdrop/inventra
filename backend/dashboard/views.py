from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum
from sales.models import SaleInvoice
from purchases.models import PurchaseInvoice
from inventory.models import Product

class DashboardSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        total_sales = SaleInvoice.objects.aggregate(Sum('total_amount'))['total_amount__sum'] or 0
        sales_due = SaleInvoice.objects.aggregate(Sum('due_amount'))['due_amount__sum'] or 0
        total_purchases = PurchaseInvoice.objects.aggregate(Sum('total_amount'))['total_amount__sum'] or 0
        purchases_due = PurchaseInvoice.objects.aggregate(Sum('due_amount'))['due_amount__sum'] or 0
        
        low_stock_products = Product.objects.filter(quantity__lte=0).count() # Or use reorder_qty
        
        return Response({
            'total_sales': total_sales,
            'sales_due': sales_due,
            'total_purchases': total_purchases,
            'purchases_due': purchases_due,
            'low_stock_alerts': low_stock_products,
            'recent_transactions': [],
            'top_customers': [],
            'top_products': [],
        })
