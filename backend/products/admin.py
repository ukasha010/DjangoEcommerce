from django.contrib import admin
from .models import Product  , Image , Inventory , AddToCart , Order
admin.site.register(Product)

admin.site.register(Image)

admin.site.register(Inventory)

admin.site.register(AddToCart)

admin.site.register(Order)
