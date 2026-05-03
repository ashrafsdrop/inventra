from rest_framework import serializers
from .models import SaleInvoice, SaleInvoiceItem, SaleReturn, SaleReturnItem, Payment

class SaleInvoiceItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')

    class Meta:
        model = SaleInvoiceItem
        fields = '__all__'
        read_only_fields = ('sale_invoice',)

class SaleInvoiceSerializer(serializers.ModelSerializer):
    customer_name = serializers.ReadOnlyField(source='customer.name')
    items = SaleInvoiceItemSerializer(many=True)

    class Meta:
        model = SaleInvoice
        fields = '__all__'

    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        invoice = SaleInvoice.objects.create(**validated_data)
        for item_data in items_data:
            SaleInvoiceItem.objects.create(sale_invoice=invoice, **item_data)
        return invoice

    def update(self, instance, validated_data):
        items_data = validated_data.pop('items', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if items_data is not None:
            instance.items.all().delete()
            for item_data in items_data:
                SaleInvoiceItem.objects.create(sale_invoice=instance, **item_data)
        return instance

class SaleReturnItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaleReturnItem
        fields = '__all__'
        read_only_fields = ('sale_return',)

class SaleReturnSerializer(serializers.ModelSerializer):
    items = SaleReturnItemSerializer(many=True)

    class Meta:
        model = SaleReturn
        fields = '__all__'

    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        sale_return = SaleReturn.objects.create(**validated_data)
        for item_data in items_data:
            SaleReturnItem.objects.create(sale_return=sale_return, **item_data)
        return sale_return

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
