from django.db import models
from core.models import TimeStampedModel
from customers.models import Customer
from inventory.models import Product

class SaleInvoice(TimeStampedModel):
    STATUS_CHOICES = (
        ('DRAFT', 'Draft'),
        ('UNPAID', 'Unpaid'),
        ('PARTIAL', 'Partial'),
        ('PAID', 'Paid'),
    )
    customer = models.ForeignKey(Customer, related_name='sale_invoices', on_delete=models.CASCADE)
    invoice_number = models.CharField(max_length=100, unique=True)
    invoice_date = models.DateField()
    due_date = models.DateField(blank=True, null=True)
    sales_person = models.CharField(max_length=255, blank=True, null=True)
    shipping_address = models.TextField(blank=True, null=True)
    note = models.TextField(blank=True, null=True)
    terms_and_conditions = models.TextField(blank=True, null=True)
    
    paid_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    due_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    total_discount = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    total_tax = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    profit = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='UNPAID')

    def __str__(self):
        return self.invoice_number

class SaleInvoiceItem(models.Model):
    sale_invoice = models.ForeignKey(SaleInvoice, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    tax = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    line_total = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)

class SaleReturn(TimeStampedModel):
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    )
    sale_invoice = models.ForeignKey(SaleInvoice, related_name='returns', on_delete=models.CASCADE)
    date = models.DateField()
    notes = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')

    def __str__(self):
        return f"Return for {self.sale_invoice.invoice_number}"

class SaleReturnItem(models.Model):
    sale_return = models.ForeignKey(SaleReturn, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(default=1)

class Payment(TimeStampedModel):
    INVOICE_TYPE_CHOICES = (
        ('SALE', 'Sale Invoice'),
        ('PURCHASE', 'Purchase Invoice'),
    )
    invoice_type = models.CharField(max_length=10, choices=INVOICE_TYPE_CHOICES)
    invoice_id = models.IntegerField()
    payment_amount = models.DecimalField(max_digits=12, decimal_places=2)
    payment_date = models.DateField()
    payment_method = models.CharField(max_length=50, blank=True, null=True)
    note = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Payment {self.id} for {self.invoice_type} {self.invoice_id}"
