from datetime import timedelta
from decimal import Decimal

from django.db.models import F, Sum
from django.db.models.functions import TruncMonth
from django.utils import timezone
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from inventory.models import Product
from purchases.models import PurchaseInvoice
from sales.models import Payment, SaleInvoice, SaleInvoiceItem, SaleReturn


def format_currency(value):
    amount = Decimal(value or 0)
    if amount == amount.to_integral():
        return f"£{amount:,.0f}"
    return f"£{amount:,.2f}"


def percent_change(current, previous):
    current_amount = Decimal(current or 0)
    previous_amount = Decimal(previous or 0)
    if previous_amount == 0:
        if current_amount == 0:
            return "0.0%"
        return "+100.0%"

    change = ((current_amount - previous_amount) / previous_amount) * 100
    sign = "+" if change >= 0 else ""
    return f"{sign}{change:.1f}%"


def month_starts(count=12):
    current = timezone.localdate().replace(day=1)
    months = []
    for _ in range(count):
        months.append(current)
        current = (current - timedelta(days=1)).replace(day=1)
    return list(reversed(months))


def month_total(mapping, month, field_name):
    row = mapping.get(month) or {}
    return Decimal(row.get(field_name) or 0)


class DashboardSummaryView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        months = month_starts(12)
        current_month = months[-1]
        previous_month = months[-2]

        sale_monthly_rows = list(
            SaleInvoice.objects.filter(invoice_date__gte=months[0])
            .annotate(month=TruncMonth("invoice_date"))
            .values("month")
            .annotate(total_sales=Sum("total_amount"), total_due=Sum("due_amount"))
        )
        purchase_monthly_rows = list(
            PurchaseInvoice.objects.filter(invoice_date__gte=months[0])
            .annotate(month=TruncMonth("invoice_date"))
            .values("month")
            .annotate(total_purchases=Sum("total_amount"), total_due=Sum("due_amount"))
        )

        sale_monthly = {row["month"]: row for row in sale_monthly_rows if row.get("month")}
        purchase_monthly = {row["month"]: row for row in purchase_monthly_rows if row.get("month")}

        current_sales = month_total(sale_monthly, current_month, "total_sales")
        previous_sales = month_total(sale_monthly, previous_month, "total_sales")
        current_sales_due = month_total(sale_monthly, current_month, "total_due")
        previous_sales_due = month_total(sale_monthly, previous_month, "total_due")
        current_purchases = month_total(purchase_monthly, current_month, "total_purchases")
        previous_purchases = month_total(purchase_monthly, previous_month, "total_purchases")
        current_purchase_due = month_total(purchase_monthly, current_month, "total_due")
        previous_purchase_due = month_total(purchase_monthly, previous_month, "total_due")

        total_sales = SaleInvoice.objects.aggregate(total=Sum("total_amount"))["total"] or 0
        total_purchases = PurchaseInvoice.objects.aggregate(total=Sum("total_amount"))["total"] or 0
        sales_due = SaleInvoice.objects.aggregate(total=Sum("due_amount"))["total"] or 0
        purchases_due = PurchaseInvoice.objects.aggregate(total=Sum("due_amount"))["total"] or 0
        paid_amount = Payment.objects.filter(invoice_type="SALE").aggregate(total=Sum("payment_amount"))["total"] or 0

        return_amount = Decimal("0")
        for sale_return in SaleReturn.objects.select_related("sale_invoice").prefetch_related("items__product"):
            for item in sale_return.items.all():
                if item.product_id:
                    return_amount += Decimal(item.quantity) * Decimal(item.product.sale_price or 0)

        low_stock_qs = Product.objects.filter(active=True, quantity__lte=F("reorder_qty")).order_by("quantity", "name")
        low_stock_items = [
            {
                "sku": product.sku,
                "item": product.name,
                "stock": product.quantity,
                "target": product.reorder_qty,
            }
            for product in low_stock_qs[:5]
        ]

        recent_transactions = []
        for invoice in SaleInvoice.objects.select_related("customer").order_by("-invoice_date", "-id")[:5]:
            recent_transactions.append(
                {
                    "id": invoice.invoice_number,
                    "title": invoice.customer.name,
                    "type": "Sale",
                    "amount": format_currency(invoice.total_amount),
                    "status": invoice.status.title(),
                    "date": invoice.invoice_date.isoformat(),
                }
            )

        for invoice in PurchaseInvoice.objects.select_related("supplier").order_by("-invoice_date", "-id")[:5]:
            recent_transactions.append(
                {
                    "id": invoice.invoice_number,
                    "title": invoice.supplier.name,
                    "type": "Purchase",
                    "amount": format_currency(invoice.total_amount),
                    "status": invoice.status.title(),
                    "date": invoice.invoice_date.isoformat(),
                }
            )

        recent_transactions = sorted(recent_transactions, key=lambda entry: entry["date"], reverse=True)[:5]

        top_customers = [
            {
                "name": row["customer__name"],
                "sales": format_currency(row["total_sales"]),
                "phone": row["customer__phone"] or "",
            }
            for row in (
                SaleInvoice.objects.select_related("customer")
                .values("customer__name", "customer__phone")
                .annotate(total_sales=Sum("total_amount"))
                .order_by("-total_sales")[:5]
            )
        ]

        top_products = [
            {
                "name": row["product__name"],
                "quantity": int(row["quantity"] or 0),
                "amount": format_currency(row["amount"]),
            }
            for row in (
                SaleInvoiceItem.objects.select_related("product")
                .filter(product__isnull=False)
                .values("product__name")
                .annotate(quantity=Sum("quantity"), amount=Sum("line_total"))
                .order_by("-amount")[:5]
            )
        ]

        chart_data = []
        for month in months:
            sale_row = sale_monthly.get(month) or {}
            purchase_row = purchase_monthly.get(month) or {}
            chart_data.append(
                {
                    "month": month.strftime("%b"),
                    "revenue": float(sale_row.get("total_sales") or 0),
                    "purchase": float(purchase_row.get("total_purchases") or 0),
                }
            )

        cash_total = Decimal(paid_amount) + Decimal(sales_due) + return_amount
        if cash_total == 0:
            cash_chart = [
                {"name": "Paid", "value": 0, "color": "#4f6ef7"},
                {"name": "Due", "value": 0, "color": "#f59e0b"},
                {"name": "Return", "value": 0, "color": "#f43f5e"},
            ]
        else:
            cash_chart = [
                {"name": "Paid", "value": round(float(Decimal(paid_amount) / cash_total * 100)), "color": "#4f6ef7"},
                {"name": "Due", "value": round(float(Decimal(sales_due) / cash_total * 100)), "color": "#f59e0b"},
                {"name": "Return", "value": round(float(return_amount / cash_total * 100)), "color": "#f43f5e"},
            ]

        return Response(
            {
                "metrics": [
                    {
                        "label": "Sales This Month",
                        "value": format_currency(current_sales),
                        "change": percent_change(current_sales, previous_sales),
                        "tone": "text-[#0ec4a8]",
                    },
                    {
                        "label": "Sales Due",
                        "value": format_currency(sales_due),
                        "change": percent_change(current_sales_due, previous_sales_due),
                        "tone": "text-[#f43f5e]",
                    },
                    {
                        "label": "Purchases This Month",
                        "value": format_currency(current_purchases),
                        "change": percent_change(current_purchases, previous_purchases),
                        "tone": "text-[#4f6ef7]",
                    },
                    {
                        "label": "Purchase Due",
                        "value": format_currency(purchases_due),
                        "change": percent_change(current_purchase_due, previous_purchase_due),
                        "tone": "text-[#f59e0b]",
                    },
                ],
                "chart_data": chart_data,
                "cash_collection": {
                    "paid": format_currency(paid_amount),
                    "due": format_currency(sales_due),
                    "returns": format_currency(return_amount),
                },
                "cash_collection_chart": cash_chart,
                "low_stock_alerts": len(low_stock_items),
                "low_stock_products": low_stock_items,
                "recent_transactions": recent_transactions,
                "top_customers": top_customers,
                "top_products": top_products,
                "totals": {
                    "total_sales": format_currency(total_sales),
                    "total_purchases": format_currency(total_purchases),
                },
            }
        )
