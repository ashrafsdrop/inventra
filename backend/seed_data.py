import os
import django
from datetime import date, timedelta

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from accounts.models import User
from customers.models import Customer
from suppliers.models import Supplier
from inventory.models import Category, Brand, Subcategory, Product, StockMovement
from purchases.models import PurchaseOrder, PurchaseOrderItem, PurchaseInvoice, PurchaseInvoiceItem
from sales.models import SaleInvoice, SaleInvoiceItem, SaleReturn, Payment

def run():
    print("Seeding data...")

    # Users
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin')

    # Customers
    c1, _ = Customer.objects.get_or_create(username='john_doe', defaults={'name': 'John Doe', 'email': 'john@example.com', 'phone': '1234567890', 'address': '123 Main St'})
    c2, _ = Customer.objects.get_or_create(username='jane_smith', defaults={'name': 'Jane Smith', 'email': 'jane@example.com', 'phone': '0987654321', 'address': '456 Oak St'})

    # Suppliers
    s1, _ = Supplier.objects.get_or_create(name='Tech Supplier Inc', defaults={'email': 'contact@techsupplier.com', 'phone': '555-1234', 'city': 'New York'})
    s2, _ = Supplier.objects.get_or_create(name='Global Imports', defaults={'email': 'info@globalimports.com', 'phone': '555-5678', 'city': 'Los Angeles'})

    # Inventory
    cat1, _ = Category.objects.get_or_create(name='Electronics')
    cat2, _ = Category.objects.get_or_create(name='Furniture')

    brand1, _ = Brand.objects.get_or_create(name='Sony')
    brand2, _ = Brand.objects.get_or_create(name='IKEA')

    subcat1, _ = Subcategory.objects.get_or_create(name='Televisions', category=cat1)
    subcat2, _ = Subcategory.objects.get_or_create(name='Desks', category=cat2)

    p1, _ = Product.objects.get_or_create(sku='TV-001', defaults={
        'name': 'Sony 55 Inch TV', 'category': cat1, 'subcategory': subcat1, 'brand': brand1,
        'purchase_price': 300.00, 'sale_price': 500.00, 'quantity': 10, 'reorder_qty': 2
    })
    p2, _ = Product.objects.get_or_create(sku='DSK-001', defaults={
        'name': 'IKEA Office Desk', 'category': cat2, 'subcategory': subcat2, 'brand': brand2,
        'purchase_price': 50.00, 'sale_price': 120.00, 'quantity': 50, 'reorder_qty': 10
    })

    # Sales
    si1, _ = SaleInvoice.objects.get_or_create(invoice_number='INV-1001', defaults={
        'customer': c1, 'invoice_date': date.today() - timedelta(days=5), 'due_date': date.today() + timedelta(days=5),
        'total_amount': 500.00, 'paid_amount': 500.00, 'status': 'PAID'
    })
    if not SaleInvoiceItem.objects.filter(sale_invoice=si1).exists():
        SaleInvoiceItem.objects.create(sale_invoice=si1, product=p1, quantity=1, price=500.00, line_total=500.00)

    si2, _ = SaleInvoice.objects.get_or_create(invoice_number='INV-1002', defaults={
        'customer': c2, 'invoice_date': date.today(), 'due_date': date.today() + timedelta(days=10),
        'total_amount': 240.00, 'due_amount': 240.00, 'status': 'UNPAID'
    })
    if not SaleInvoiceItem.objects.filter(sale_invoice=si2).exists():
        SaleInvoiceItem.objects.create(sale_invoice=si2, product=p2, quantity=2, price=120.00, line_total=240.00)

    # Purchases
    pi1, _ = PurchaseInvoice.objects.get_or_create(invoice_number='PINV-2001', defaults={
        'supplier': s1, 'invoice_date': date.today() - timedelta(days=10),
        'total_amount': 3000.00, 'paid_amount': 1500.00, 'due_amount': 1500.00, 'status': 'PARTIAL'
    })
    if not PurchaseInvoiceItem.objects.filter(purchase_invoice=pi1).exists():
        PurchaseInvoiceItem.objects.create(purchase_invoice=pi1, product=p1, quantity=10, purchase_price=300.00, line_total=3000.00)

    print("Seed data successfully added!")

if __name__ == '__main__':
    run()
