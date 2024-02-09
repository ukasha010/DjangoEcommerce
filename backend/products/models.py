# models.py
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.conf import settings
from .validators import QuantityValidator
from django.core.exceptions import ValidationError




class Product(models.Model):
    CATEGORY_CHOICES = [
        ('clothing', 'Clothing'),
        ('electronics', 'Electronics'),
        ('books', 'Books'),
        # Add more categories as needed
    ]
    product_name = models.CharField(max_length=255)
    description = models.TextField(max_length=150)
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    category = models.CharField(max_length=20 , choices=CATEGORY_CHOICES)
    on_sale = models.BooleanField(default=False)
    sale_price = models.DecimalField(max_digits=10 , decimal_places=2 , blank=True , null=True , validators=[MinValueValidator(0)])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product_name

    def inventory(self):
        return Inventory.objects.filter(product=self)
    
    def images(self):
        return Image.objects.filter(product=self)

    
class Image(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    img = models.ImageField(upload_to="product_images")
    
    def __str__(self):
        return self.img.name
    
        


#Pendings
#Save attributes according to the product type if possible.
class Inventory(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='inventory')
    size = models.CharField(max_length=20 , blank = True , null = True)
    color = models.CharField(max_length=20 , blank = True , null = True)
    quantity = models.PositiveIntegerField()

    class Meta:
        unique_together = ('product', 'size', 'color')

    def __str__(self):
        return f"{self.product.product_name} - {self.size} - {self.color}"



class AddToCart(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL , on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL , null = True)
    inventory = models.ForeignKey(Inventory , on_delete = models.SET_NULL , null = True)
    quantity = models.IntegerField(default = 1)

    class Meta:
        unique_together = ('user', 'product' , 'inventory')
   
    def __str__(self):
        return f"{self.user} - {self.product}"
     
    # def clean(self):
    #     super().clean()
    #     validator = QuantityValidator(0)
    #     validator(self.quantity, self)
    
    def clean(self):
        super().clean()
        if self.inventory:
            inventory_quantity = self.inventory.quantity
            max_validator = MaxValueValidator(inventory_quantity , message=f'Ensure that the quantity is less then or equals to {inventory_quantity}')
            max_validator(self.quantity)


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL , on_delete=models.CASCADE)
    order_item  = models.ForeignKey(AddToCart, on_delete=models.SET_NULL, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    total_price = models.DecimalField(default=True,max_digits=12, decimal_places=2, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(null=True, blank=True)  
    isDeliver = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(null=True, blank=True) 
    createdAt = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return str(self.user)
    
    def clean(self):
        super().clean()
        if self.order_item:
            order_item_price = self.order_item.product.price

            errors = {}
            if order_item_price != self.price:
                errors['price'] = ['Price must be same as products price']
            
            if self.total_price < order_item_price:
                errors['total_price'] = ['Total Price must be greater then or equals to the products price']

            if errors:
                raise ValidationError(errors)