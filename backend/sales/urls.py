from rest_framework.routers import DefaultRouter
from .views import SaleInvoiceViewSet, SaleReturnViewSet, PaymentViewSet

router = DefaultRouter()
router.register(r'invoices', SaleInvoiceViewSet, basename='saleinvoice')
router.register(r'returns', SaleReturnViewSet, basename='salereturn')
router.register(r'payments', PaymentViewSet, basename='payment')

urlpatterns = router.urls
