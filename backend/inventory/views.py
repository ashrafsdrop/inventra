from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
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
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    search_fields = ['name', 'sku', 'barcode']
    filterset_fields = ['category', 'brand', 'subcategory', 'active']
    ordering_fields = ['name', 'created_at', 'sale_price', 'quantity']

class StockMovementViewSet(viewsets.ModelViewSet):
    queryset = StockMovement.objects.all().order_by('-created_at')
    serializer_class = StockMovementSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['product', 'movement_type']
