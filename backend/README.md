# Inventra ERP Backend

This is a full Django Rest Framework (DRF) backend for the Inventra Next.js ERP dashboard.

## Tech Stack
- **Django 5**
- **Django Rest Framework**
- **SimpleJWT** for JWT authentication
- **PostgreSQL** (configured in `settings.py`, but uses `SQLite` by default for out-of-the-box development)
- **django-cors-headers**
- **django-filter** for filtering
- **drf-spectacular** for OpenAPI / Swagger UI
- **Pillow** for Image handling

## Apps
- `core`: Base abstracts like `TimeStampedModel`
- `accounts`: User authentication and profiles
- `customers`: Customer CRUD and CSV Import
- `suppliers`: Supplier CRUD
- `inventory`: Categories, Brands, Subcategories, Products, StockMovements
- `purchases`: Purchase Orders, Invoices, and nested Items
- `sales`: Sale Invoices, Returns, Payments
- `dashboard`: Custom endpoints for frontend dashboard cards

## Quick Start

1. **Activate Virtual Environment** (Already created, but for future reference)
   ```bash
   cd backend
   python -m venv venv
   .\venv\Scripts\activate   # Windows
   # source venv/bin/activate # Mac/Linux
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Database Setup**
   *(Note: Migrations have already been applied, and the database has been seeded with SQLite for quick testing!)*
   To reset or apply new models, use:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Start the Development Server**
   ```bash
   python manage.py runserver
   ```

## Seed Data & Test Accounts
A script has already been run to populate the local database with some test data.
- **Admin Login:** `admin` / `admin`
- The seed data contains sample Customers, Suppliers, Inventory items (TV and Desk), Sales Invoices, and Purchase Invoices.

## Important API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/docs/` | GET | OpenAPI/Swagger Documentation UI |
| `/api/accounts/login/` | POST | Login to get JWT Token |
| `/api/accounts/signup/` | POST | Register a new user |
| `/api/dashboard/summary/` | GET | Aggregated Dashboard data |
| `/api/customers/import_csv/` | POST | Import customers from CSV (`file` param) |
| `/api/sales/invoices/` | GET/POST | Create sale invoice (accepts nested `items`) |
| `/api/inventory/products/` | GET/POST | Manage products (handles Image uploads) |

## Switching to PostgreSQL
In `backend/config/settings.py`, comment out the `sqlite3` configuration and uncomment the `postgresql` block. Ensure you install `psycopg2-binary` and create a PostgreSQL database named `inventra`.
