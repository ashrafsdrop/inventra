import os

base_dir = r"d:\nodeJS\university\CSC 387\inventra\backend"
apps = ["accounts", "customers", "suppliers", "inventory", "purchases", "sales", "dashboard", "core"]

os.makedirs(os.path.join(base_dir, "config"), exist_ok=True)
for f in ["__init__.py", "settings.py", "urls.py", "wsgi.py", "asgi.py"]:
    with open(os.path.join(base_dir, "config", f), "w") as fp:
        pass

with open(os.path.join(base_dir, "manage.py"), "w") as fp:
    pass

with open(os.path.join(base_dir, "requirements.txt"), "w") as fp:
    fp.write("Django>=5.0\ndjangorestframework\ndjango-cors-headers\ndjango-filter\ndrf-spectacular\nPillow\npsycopg2-binary\ndjangorestframework-simplejwt\n")

for app in apps:
    app_dir = os.path.join(base_dir, app)
    os.makedirs(app_dir, exist_ok=True)
    for f in ["__init__.py", "models.py", "views.py", "serializers.py", "urls.py", "apps.py", "admin.py"]:
        with open(os.path.join(app_dir, f), "w") as fp:
            pass
