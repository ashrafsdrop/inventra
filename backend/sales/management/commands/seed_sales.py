from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import date
from django.db import transaction

from customers.models import Customer
from inventory.models import Product
from sales.models import SaleInvoice, SaleInvoiceItem, SaleReturn, SaleReturnItem, Payment


def shift_month(base_date, months_back):
    month = base_date.month - months_back
    year = base_date.year
    while month <= 0:
        month += 12
        year -= 1
    return date(year, month, min(base_date.day, 28))


class Command(BaseCommand):
    help = 'Seed sales invoice data'

    @transaction.atomic
    def handle(self, *args, **options):
        today = timezone.localdate()
        this_month = today.replace(day=5)
        last_month = shift_month(today, 1)
        two_months_ago = shift_month(today, 2)

        # Get customers (they should already exist from main seed)
        try:
            customers = {
                'apple_inc': Customer.objects.get(username='apple_inc'),
                'hp_enterprise': Customer.objects.get(username='hp_enterprise'),
                'microsoft_corp': Customer.objects.get(username='microsoft_corp'),
                'dell_tech': Customer.objects.get(username='dell_tech'),
            }
        except Customer.DoesNotExist:
            self.stdout.write(self.style.ERROR('Customers not found. Run main seed first.'))
            return

        # Get products
        try:
            p3 = Product.objects.get(sku='APL-014')  # iPhone
            p4 = Product.objects.get(sku='APL-M2')   # MacBook
            p5 = Product.objects.get(sku='HP-240')   # HP Laptop
            p6 = Product.objects.get(sku='CHR-001')  # Chair
            p7 = Product.objects.get(sku='PRT-002')  # Printer
            p8 = Product.objects.get(sku='LMP-010')  # Lamp
            p2 = Product.objects.get(sku='DSK-001')  # Desk
        except Product.DoesNotExist:
            self.stdout.write(self.style.ERROR('Products not found. Run main seed first.'))
            return

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

        # Seed payments
        Payment.objects.update_or_create(
            invoice_type='SALE',
            invoice_id=created_sale_invoices['INV-1001'].id,
            payment_date=this_month,
            defaults={
                'payment_amount': 2398.00,
                'payment_method': 'Bank Transfer',
                'note': 'Collected in full',
            },
        )
        Payment.objects.update_or_create(
            invoice_type='SALE',
            invoice_id=created_sale_invoices['INV-1002'].id,
            payment_date=last_month,
            defaults={
                'payment_amount': 900.00,
                'payment_method': 'Bank Transfer',
                'note': 'Partial payment',
            },
        )
        Payment.objects.update_or_create(
            invoice_type='SALE',
            invoice_id=created_sale_invoices['INV-1004'].id,
            payment_date=this_month,
            defaults={
                'payment_amount': 948.00,
                'payment_method': 'Bank Transfer',
                'note': 'Collected in full',
            },
        )

        self.stdout.write(self.style.SUCCESS('Sale invoice seed data successfully added!'))
