from rest_framework.routers import DefaultRouter
from .views import PurchaseOrderViewSet, PurchaseInvoiceViewSet

router = DefaultRouter()
router.register(r'orders', PurchaseOrderViewSet, basename='purchaseorder')
router.register(r'invoices', PurchaseInvoiceViewSet, basename='purchaseinvoice')

urlpatterns = router.urls
