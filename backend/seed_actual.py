import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from customers.models import Customer
from sales.models import SaleInvoice

def run():
    print('Clearing dummy seed data...')
    SaleInvoice.objects.filter(invoice_number__in=['INV-1001', 'INV-1002', 'INV-1003', 'INV-1004']).delete()
    
    print('Seeding ACTUAL user data...')
    
    invoices = [
        { "id": "INV-10428", "date": "2026-05-01", "customer": "Apple Inc.", "totalAmount": 245000, "paid": 200000, "due": 45000, "tax": 12250, "dueDate": "2026-05-15", "profit": 38000, "salePerson": "Ayesha Khan" },
        { "id": "INV-10429", "date": "2026-05-02", "customer": "HP Enterprise", "totalAmount": 187000, "paid": 150000, "due": 37000, "tax": 9350, "dueDate": "2026-05-17", "profit": 29500, "salePerson": "Daniel Roberts" },
        { "id": "INV-10430", "date": "2026-05-03", "customer": "Microsoft Corp", "totalAmount": 135000, "paid": 135000, "due": 0, "tax: 6750": 6750, "dueDate": "2026-05-18", "profit": 21600, "salePerson": "Maya Singh" },
        { "id": "INV-10431", "date": "2026-05-04", "customer": "IKEA Systems", "totalAmount": 62000, "paid": 42000, "due": 20000, "tax: 3100": 3100, "dueDate": "2026-05-20", "profit": 8400, "salePerson": "Ayesha Khan" },
    ]

    for inv in invoices:
        # Create or get the customer
        cust, _ = Customer.objects.get_or_create(
            name=inv["customer"],
            defaults={"username": inv["customer"].lower().replace(" ", "_")}
        )
        
        status = "PAID" if inv["due"] == 0 else "PARTIAL" if inv["paid"] > 0 else "UNPAID"

        SaleInvoice.objects.update_or_create(
            invoice_number=inv["id"],
            defaults={
                "customer": cust,
                "invoice_date": inv["date"],
                "due_date": inv["dueDate"],
                "total_amount": inv["totalAmount"],
                "paid_amount": inv["paid"],
                "due_amount": inv["due"],
                "total_tax": inv.get("tax", inv.get("tax: 6750", inv.get("tax: 3100", 0))),
                "profit": inv["profit"],
                "sales_person": inv["salePerson"],
                "status": status,
            }
        )

    print('Successfully inserted your actual data into the database!')

if __name__ == '__main__':
    run()
