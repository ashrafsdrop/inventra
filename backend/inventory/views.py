from datetime import datetime, timezone as dt_timezone

from django.db.models import F, Sum
from rest_framework import viewsets
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Category, Brand, Subcategory, Product, StockMovement
from .serializers import CategorySerializer, BrandSerializer, SubcategorySerializer, ProductSerializer, StockMovementSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('-created_at')
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    search_fields = ['name']

class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all().order_by('-created_at')
    serializer_class = BrandSerializer
    permission_classes = [IsAuthenticated]
    search_fields = ['name']

class SubcategoryViewSet(viewsets.ModelViewSet):
    queryset = Subcategory.objects.all().order_by('-created_at')
    serializer_class = SubcategorySerializer
    permission_classes = [IsAuthenticated]
    search_fields = ['name']

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related('category', 'brand', 'subcategory').order_by('-created_at')
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    parser_classes = [JSONParser, FormParser, MultiPartParser]
    search_fields = ['name', 'sku', 'barcode']
    filterset_fields = ['category', 'brand', 'subcategory', 'active']
    ordering_fields = ['name', 'created_at', 'sale_price', 'quantity']

class StockMovementViewSet(viewsets.ModelViewSet):
    queryset = StockMovement.objects.all().order_by('-created_at')
    serializer_class = StockMovementSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['product', 'movement_type']


def _format_time_ago(value):
    if value is None:
        return ''

    now = datetime.now(dt_timezone.utc)
    delta = now - value
    total_seconds = int(delta.total_seconds())

    if total_seconds < 60:
        return 'just now'
    if total_seconds < 3600:
        minutes = total_seconds // 60
        return f'{minutes} minute{"s" if minutes != 1 else ""} ago'
    if total_seconds < 86400:
        hours = total_seconds // 3600
        return f'{hours} hour{"s" if hours != 1 else ""} ago'

    days = total_seconds // 86400
    return f'{days} day{"s" if days != 1 else ""} ago'


class InventorySummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        total_products = Product.objects.count()
        categories_count = Category.objects.count()
        total_value = Product.objects.aggregate(
            total=Sum(F('quantity') * F('purchase_price'))
        )['total'] or 0

        low_stock_qs = Product.objects.filter(active=True, quantity__gt=0, quantity__lte=F('reorder_qty')).order_by('quantity', 'name')
        out_of_stock_count = Product.objects.filter(active=True, quantity__lte=0).count()
        reorder_points = low_stock_qs.count() + out_of_stock_count

        low_stock_products = [
            {
                'id': product.id,
                'name': product.name,
                'sku': product.sku,
                'quantity': product.quantity,
                'reorder_qty': product.reorder_qty,
                'brand': product.brand.name if product.brand else '',
                'category': product.category.name if product.category else '',
                'sub_category': product.subcategory.name if product.subcategory else '',
            }
            for product in low_stock_qs[:10]
        ]

        recent_activity = []
        for movement in StockMovement.objects.select_related('product').order_by('-created_at', '-id')[:8]:
            quantity_change = movement.quantity_change
            action = 'Stock Added' if quantity_change > 0 else 'Stock Removed' if quantity_change < 0 else 'Stock Adjusted'
            recent_activity.append({
                'id': movement.id,
                'action': action,
                'item': movement.product.name if movement.product else '',
                'sku': movement.product.sku if movement.product else '',
                'movement_type': movement.movement_type,
                'quantity_change': quantity_change,
                'reference': movement.reference,
                'notes': movement.notes,
                'time': _format_time_ago(movement.created_at),
                'created_at': movement.created_at.isoformat(),
            })

        category_breakdown = [
            {
                'id': category.id,
                'name': category.name,
                'product_count': category.product_count,
                'description': category.description or '',
            }
            for category in Category.objects.all().order_by('name')
        ]

        return Response({
            'total_products': total_products,
            'categories_count': categories_count,
            'total_value': round(float(total_value), 2),
            'total_value_display': f'£{float(total_value):,.0f}',
            'low_stock_count': low_stock_qs.count(),
            'out_of_stock_count': out_of_stock_count,
            'reorder_points': reorder_points,
            'recent_activity': recent_activity,
            'low_stock_products': low_stock_products,
            'category_breakdown': category_breakdown,
        })
