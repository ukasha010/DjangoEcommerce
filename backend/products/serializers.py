from rest_framework import serializers
from .models import Product, Image, Inventory, AddToCart, Order
from accounts.serializers import CustomUserCreateSerializer
import json

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('img',)


class InventorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Inventory
        fields = ['size', 'color', 'quantity',]

class ProductSerializer(serializers.ModelSerializer):
    inventory = InventorySerializer(many=True , read_only = True)
    images = ImageSerializer(many=True , read_only = True)

    class Meta:
        model = Product
        fields = "__all__" 

    def create(self, validated_data):
        inventory_data = validated_data.pop('inventory')
        images_data = validated_data.pop('images' , [])
        product = Product.objects.create(**validated_data)

        for inventory_item in inventory_data:
            Inventory.objects.create(product=product, **inventory_item)

        for image_data in images_data:
            Image.objects.create(product=product, **image_data)

        return product


class AddToCartSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)
    product_name = serializers.CharField(source='product.product_name', read_only=True)
    class Meta:
        model = AddToCart
        fields = ['id', 'user', 'product_name' , 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    user = CustomUserCreateSerializer(read_only=True)
    order_item = AddToCartSerializer(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_total_price(self, obj):
        total_price = 0
        if obj.order_item:  
            total_price += obj.order_item.product.price * obj.order_item.quantity
        return total_price
