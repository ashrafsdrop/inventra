from rest_framework.routers import DefaultRouter
from django.urls import path

from .views import CategoryViewSet, BrandViewSet, SubcategoryViewSet, ProductViewSet, StockMovementViewSet, InventorySummaryView

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'brands', BrandViewSet, basename='brand')
router.register(r'subcategories', SubcategoryViewSet, basename='subcategory')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'movements', StockMovementViewSet, basename='stockmovement')

urlpatterns = router.urls
urlpatterns += [
	path('summary/', InventorySummaryView.as_view(), name='inventory-summary'),
]
