from django.contrib import admin
from .models import Product  , Image , Inventory 
admin.site.register(Product)

admin.site.register(Image)

admin.site.register(Inventory)
