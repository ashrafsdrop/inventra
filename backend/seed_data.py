import os
from datetime import date

import django
from django.utils import timezone

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from accounts.models import User
from customers.models import Customer
from inventory.models import Brand, Category, Product, StockMovement, Subcategory
from purchases.models import PurchaseInvoice, PurchaseInvoiceItem
from sales.models import Payment, SaleInvoice, SaleInvoiceItem, SaleReturn, SaleReturnItem
from suppliers.models import Supplier


def shift_month(base_date, months_back):
    month = base_date.month - months_back
    year = base_date.year
    while month <= 0:
        month += 12
        year -= 1
    return date(year, month, min(base_date.day, 28))


def ensure_payment(invoice_type, invoice_id, amount, payment_date, note=None):
    Payment.objects.update_or_create(
        invoice_type=invoice_type,
        invoice_id=invoice_id,
        payment_date=payment_date,
        defaults={
            'payment_amount': amount,
            'payment_method': 'Bank Transfer',
            'note': note,
        },
    )


def run():
    print('Seeding data...')

    today = timezone.localdate()
    this_month = today.replace(day=5)
    last_month = shift_month(today, 1)
    two_months_ago = shift_month(today, 2)

    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin')

    customers = {}
    for username, name, email, phone in [
        ('apple_inc', 'Apple Inc.', 'ap@apple.example', '+1 (800) 275-2273'),
        ('hp_enterprise', 'HP Enterprise', 'sales@hp.example', '+1 (650) 857-1501'),
        ('microsoft_corp', 'Microsoft Corp', 'billing@microsoft.example', '+1 (425) 882-8080'),
        ('dell_tech', 'Dell Technologies', 'orders@dell.example', '+1 (800) 624-9897'),
        ('ikea_systems', 'IKEA Systems', 'accounts@ikea.example', '+46 8 586 933 00'),
    ]:
        customers[username], _ = Customer.objects.update_or_create(
            username=username,
            defaults={
                'name': name,
                'email': email,
                'phone': phone,
                'address': f'{name} HQ',
            },
        )

    suppliers = {}
    for name, email, phone, city in [
        ('Tech Supplier Inc', 'contact@techsupplier.com', '555-1234', 'New York'),
        ('Global Imports', 'info@globalimports.com', '555-5678', 'Los Angeles'),
        ('Office Essentials Co', 'hello@officeessentials.example', '555-9000', 'Chicago'),
    ]:
        suppliers[name], _ = Supplier.objects.update_or_create(
            name=name,
            defaults={
                'email': email,
                'phone': phone,
                'city': city,
                'country': 'USA',
                'payment_terms': 'Net 30',
                'address': f'{name} Warehouse',
            },
        )

    cat1, _ = Category.objects.update_or_create(
        name='Electronics',
        defaults={'description': 'Consumer and business electronics'},
    )
    cat2, _ = Category.objects.update_or_create(
        name='Furniture',
        defaults={'description': 'Office furniture and fittings'},
    )

    brand1, _ = Brand.objects.update_or_create(name='Sony', defaults={})
    brand2, _ = Brand.objects.update_or_create(name='IKEA', defaults={})
    brand3, _ = Brand.objects.update_or_create(name='Apple', defaults={})
    brand4, _ = Brand.objects.update_or_create(name='HP', defaults={})

    subcat1, _ = Subcategory.objects.update_or_create(name='Televisions', category=cat1, defaults={})
    subcat2, _ = Subcategory.objects.update_or_create(name='Desks', category=cat2, defaults={})
    subcat3, _ = Subcategory.objects.update_or_create(name='Laptops', category=cat1, defaults={})
    subcat4, _ = Subcategory.objects.update_or_create(name='Accessories', category=cat1, defaults={})
    subcat5, _ = Subcategory.objects.update_or_create(name='Office Seating', category=cat2, defaults={})

    products = {}
    for sku, name, category, subcategory, brand, purchase_price, sale_price, quantity, reorder_qty in [
        ('TV-001', 'Sony 55 Inch TV', cat1, subcat1, brand1, 300.00, 500.00, 10, 2),
        ('DSK-001', 'IKEA Office Desk', cat2, subcat2, brand2, 50.00, 120.00, 50, 10),
        ('APL-014', 'Apple iPhone 14', cat1, subcat4, brand3, 650.00, 899.00, 12, 50),
        ('APL-M2', 'Apple MacBook Air M2', cat1, subcat3, brand3, 950.00, 1299.00, 7, 25),
        ('HP-240', 'HP 240 G8 Core i5', cat1, subcat3, brand4, 520.00, 699.00, 32, 15),
        ('CHR-001', 'Office Chair Pro', cat2, subcat5, brand2, 80.00, 149.00, 18, 40),
        ('PRT-002', 'Laser Printer X2', cat1, subcat4, brand4, 180.00, 299.00, 4, 20),
        ('LMP-010', 'Desk Lamp Flex', cat2, subcat2, brand2, 15.00, 39.00, 60, 15),
    ]:
        products[sku], _ = Product.objects.update_or_create(
            sku=sku,
            defaults={
                'name': name,
                'category': category,
                'subcategory': subcategory,
                'brand': brand,
                'purchase_price': purchase_price,
                'sale_price': sale_price,
                'quantity': quantity,
                'reorder_qty': reorder_qty,
                'unit_of_measure': 'pcs',
                'active': True,
            },
        )

    p1 = products['TV-001']
    p2 = products['DSK-001']
    p3 = products['APL-014']
    p4 = products['APL-M2']
    p5 = products['HP-240']
    p6 = products['CHR-001']
    p7 = products['PRT-002']
    p8 = products['LMP-010']

    sale_invoices = [
        ('INV-1001', customers['apple_inc'], this_month, today.replace(day=20), 2398.00, 2398.00, 0.00, 'PAID'),
        ('INV-1002', customers['hp_enterprise'], last_month, last_month.replace(day=18), 1818.00, 900.00, 918.00, 'PARTIAL'),
        ('INV-1003', customers['microsoft_corp'], two_months_ago, two_months_ago.replace(day=16), 1398.00, 0.00, 1398.00, 'UNPAID'),
        ('INV-1004', customers['dell_tech'], this_month, today.replace(day=22), 948.00, 948.00, 0.00, 'PAID'),
    ]

    sale_item_map = {
        'INV-1001': [(p3, 2, 899.00), (p4, 1, 600.00)],
        'INV-1002': [(p6, 6, 149.00), (p7, 3, 299.00)],
        'INV-1003': [(p5, 2, 699.00)],
        'INV-1004': [(p8, 12, 39.00), (p2, 1, 120.00)],
    }

    created_sale_invoices = {}
    for invoice_number, customer, invoice_date, due_date, total_amount, paid_amount, due_amount, status in sale_invoices:
        invoice, _ = SaleInvoice.objects.update_or_create(
            invoice_number=invoice_number,
            defaults={
                'customer': customer,
                'invoice_date': invoice_date,
                'due_date': due_date,
                'total_amount': total_amount,
                'paid_amount': paid_amount,
                'due_amount': due_amount,
                'total_discount': 0.00,
                'total_tax': 0.00,
                'profit': max(total_amount * 0.22, 0),
                'status': status,
            },
        )
        created_sale_invoices[invoice_number] = invoice

    for invoice_number, rows in sale_item_map.items():
        invoice = created_sale_invoices[invoice_number]
        for product, quantity, price in rows:
            SaleInvoiceItem.objects.update_or_create(
                sale_invoice=invoice,
                product=product,
                defaults={
                    'quantity': quantity,
                    'price': price,
                    'discount': 0.00,
                    'tax': 0.00,
                    'line_total': quantity * price,
                },
            )

    sale_return, _ = SaleReturn.objects.update_or_create(
        sale_invoice=created_sale_invoices['INV-1001'],
        defaults={
            'date': this_month,
            'notes': 'Damaged packaging returned by the customer',
            'status': 'APPROVED',
        },
    )
    SaleReturnItem.objects.update_or_create(
        sale_return=sale_return,
        product=p3,
        defaults={'quantity': 1},
    )

    purchase_invoices = [
        ('PINV-2001', suppliers['Tech Supplier Inc'], this_month, today.replace(day=25), 3000.00, 1800.00, 1200.00, 'PARTIAL'),
        ('PINV-2002', suppliers['Global Imports'], last_month, last_month.replace(day=24), 1520.00, 1520.00, 0.00, 'PAID'),
        ('PINV-2003', suppliers['Office Essentials Co'], two_months_ago, two_months_ago.replace(day=20), 940.00, 0.00, 940.00, 'UNPAID'),
    ]

    purchase_item_map = {
        'PINV-2001': [(p3, 3, 650.00), (p7, 10, 180.00)],
        'PINV-2002': [(p6, 20, 95.00), (p8, 40, 15.00)],
        'PINV-2003': [(p1, 2, 300.00), (p2, 4, 50.00)],
    }

    created_purchase_invoices = {}
    for invoice_number, supplier, invoice_date, due_date, total_amount, paid_amount, due_amount, status in purchase_invoices:
        invoice, _ = PurchaseInvoice.objects.update_or_create(
            invoice_number=invoice_number,
            defaults={
                'supplier': supplier,
                'invoice_date': invoice_date,
                'due_date': due_date,
                'total_amount': total_amount,
                'paid_amount': paid_amount,
                'due_amount': due_amount,
                'total_tax': 0.00,
                'memo': 'Seed data invoice',
                'note': 'Generated for dashboard data',
                'status': status,
            },
        )
        created_purchase_invoices[invoice_number] = invoice

    for invoice_number, rows in purchase_item_map.items():
        invoice = created_purchase_invoices[invoice_number]
        for product, quantity, purchase_price in rows:
            PurchaseInvoiceItem.objects.update_or_create(
                purchase_invoice=invoice,
                product=product,
                defaults={
                    'quantity': quantity,
                    'purchase_price': purchase_price,
                    'selling_price': float(purchase_price) * 1.5,
                    'tax': 0.00,
                    'line_total': quantity * purchase_price,
                },
            )

    ensure_payment('SALE', created_sale_invoices['INV-1001'].id, 2398.00, this_month, 'Collected in full')
    ensure_payment('SALE', created_sale_invoices['INV-1002'].id, 900.00, last_month, 'Partial payment')
    ensure_payment('SALE', created_sale_invoices['INV-1004'].id, 948.00, this_month, 'Collected in full')
    ensure_payment('PURCHASE', created_purchase_invoices['PINV-2001'].id, 1800.00, this_month, 'Supplier payment')
    ensure_payment('PURCHASE', created_purchase_invoices['PINV-2002'].id, 1520.00, last_month, 'Supplier payment')

    movement_payloads = [
        (p3, -2, 'OUT', 'INV-1001', 'Sold iPhone 14 units'),
        (p4, -1, 'OUT', 'INV-1001', 'Sold MacBook Air unit'),
        (p6, -6, 'OUT', 'INV-1002', 'Sold office chairs'),
        (p7, 10, 'IN', 'PINV-2001', 'Restocked laser printers'),
        (p8, 40, 'IN', 'PINV-2002', 'Received desk lamps'),
    ]
    for product, quantity_change, movement_type, reference, notes in movement_payloads:
        StockMovement.objects.update_or_create(
            product=product,
            movement_type=movement_type,
            reference=reference,
            defaults={
                'quantity_change': quantity_change,
                'notes': notes,
            },
        )

    print('Seed data successfully added!')


if __name__ == '__main__':
    run()
