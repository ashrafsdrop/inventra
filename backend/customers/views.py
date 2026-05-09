import csv
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Customer
from .serializers import CustomerSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all().order_by('-created_at')
    serializer_class = CustomerSerializer
    permission_classes = [AllowAny]
    search_fields = ['name', 'email', 'phone', 'username']
    ordering_fields = ['name', 'created_at']

    @action(detail=False, methods=['post'])
    def import_csv(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            decoded_file = file.read().decode('utf-8').splitlines()
            reader = csv.DictReader(decoded_file)
            created_count = 0
            for row in reader:
                Customer.objects.create(
                    name=row.get('name', ''),
                    username=row.get('username', row.get('name', '')),
                    email=row.get('email', ''),
                    phone=row.get('phone', ''),
                    address=row.get('address', '')
                )
                created_count += 1
            return Response({"message": f"Successfully imported {created_count} customers."}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
