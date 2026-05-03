from rest_framework import serializers
from .models import Category, Brand, Subcategory, Product, StockMovement

class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.ReadOnlyField()
    class Meta:
        model = Category
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    brand_name = serializers.ReadOnlyField(source='brand.name')
    subcategory_name = serializers.ReadOnlyField(source='subcategory.name')
    
    class Meta:
        model = Product
        fields = '__all__'

class StockMovementSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    
    class Meta:
        model = StockMovement
        fields = '__all__'
