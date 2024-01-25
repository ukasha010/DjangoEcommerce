from rest_framework.views import APIView
from django.shortcuts import render , HttpResponse
from rest_framework import status
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from .models import Product , Image , Inventory , AddToCart , Order
from decimal import Decimal
from .serializers import ProductSerializer , OrderSerializer , AddToCartSerializer , ImageSerializer , InventorySerializer
from rest_framework import permissions , authentication
from rest_framework.permissions import IsAuthenticated , AllowAny
from django.contrib.auth.models import User
import json
from rest_framework.generics import get_object_or_404


class ProductView(APIView):
    # permission_classes = [permissions.IsAuthenticated]
    # authentication_classes = [authentication.BasicAuthentication]
    def get(self, request , product_id = None , *args, **kwargs):
        if product_id == None:
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
            user = request.user
            if user.is_superuser:
                return Response({'products': serializer.data, 'user': user.username , 'error' : serializer.errors}, status=status.HTTP_200_OK)
            else:
                return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            product = Product.objects.filter(id = product_id).first()
            serializer = ProductSerializer(product)
            user = request.user
            if user.is_superuser:
                return Response({'product': serializer.data, 'user': user.username , 'error' : serializer.errors}, status=status.HTTP_200_OK)
            else:
                return Response(serializer.data, status=status.HTTP_200_OK)



    def post(self, request, *args, **kwargs):
        product_data = request.data.get("data")
        images = request.FILES.getlist("images")

        # Deserialize product data
        try:
            product_data_dict = json.loads(product_data)
        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON data"}, status=status.HTTP_400_BAD_REQUEST)

        images_dicts = [{"img": image} for image in images]
        # Add the image to product_data_dict
        product_data_dict["images"] = images_dicts


        # Serialize the data using a serializer
        serializer = ProductSerializer(data=product_data_dict)

        # Validate and save the data
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Product created successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
    # def post(self, request, *args, **kwargs):
    #     print(request.data)
    #     images_data = request.FILES.getlist('images')
    #     inventory_data = request.data.get('inventory', [])
    #     inventory_data = json.loads(inventory_data)
    #     product_data = {
    #         key: value for key, value in request.data.items()
    #         if key not in ['images', 'inventory']
    #     }
    #     serializer = ProductSerializer(data=product_data)
    #     if serializer.is_valid():
    #         product = serializer.save()

    #         for image_data in images_data:
    #             Image.objects.create(product=product, img=image_data)

    #         for inventory_item_data in inventory_data:

    #             Inventory.objects.create(
    #                 product=product,
    #                 size=inventory_item_data['size'],
    #                 color=inventory_item_data['color'],
    #                 quantity=inventory_item_data['quantity']
    #             )

    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def put(self, request, product_id, *args, **kwargs):
    #     product = Product.objects.get(id=product_id)
    #     serializer = ProductSerializer(product, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(status=status.HTTP_200_OK)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def delete(self, request, product_id, *args, **kwargs):
    #     product = Product.objects.get(id=product_id)
    #     product.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)

class AddToCartView(APIView):
    serializer_class = AddToCartSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        try:
            instances = AddToCart.objects.filter(user=request.user)
            serializer = AddToCartSerializer(instances, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except AddToCart.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data, context={'request': request, 'user': request.user})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        instance = get_object_or_404(AddToCart, id=id)
        serializer = AddToCartSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        instance = get_object_or_404(AddToCart, id=id)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class OrderView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            instance = Order.objects.get(user=request.user)
            serializer = OrderSerializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        serializer = OrderSerializer(data=request.data, context={'request': request, 'user': request.user})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, *args, **kwargs):
        instance = get_object_or_404(Order, id=id)
        serializer = OrderSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, *args, **kwargs):
        instance = get_object_or_404(Order, id=id)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)






















# class AddToCartView(APIView):
#     #queryset = AddToCart.objects.all()
#     #serializer_class = AddToCartSerializer
#     permission_classes = [AllowAny]  # Uncomment if needed

#     def get(self, request,*args, **kwargs):
#         try:
#             # Check if the user is authenticated before attempting to get the AddToCart instance
#             if request.user.is_authenticated:
#                 instances = AddToCart.objects.all()
#                 serializer = AddToCartSerializer(instances, many=True)
#                 return Response(serializer.data, status=status.HTTP_200_OK)
#             else:
#                 # If the user is not authenticated, return a 401 Unauthorized response
#                 return Response(status=status.HTTP_401_UNAUTHORIZED)
#         except AddToCart.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#     def post(self, request, format=None):
#         serializer = self.serializer_class(data=request.data, context={'request': request})
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#     def put(self, request, id,*args, **kwargs):
#         try:
#             instance = AddToCart.objects.get(id=id)
#         except AddToCart.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#         serializer = AddToCartSerializer(instance, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data,  status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, id, *args, **kwargs):
#         try:
#             instance = AddToCart.objects.get(id=id)
#         except AddToCart.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#         instance.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
    
# class Order(APIView):
#     def get(self, request,*args, **kwargs):
#         try:
#             # Check if the user is authenticated before attempting to get the AddToCart instance
#             if request.user.is_authenticated:
#                 instance = Order.objects.get(user=request.user)
#                 serializer = OrderSerializer(instance, many=True)
#                 return Response(serializer.data,  status=status.HTTP_200_OK)
#             else:
#                 # If the user is not authenticated, return a 401 Unauthorized response
#                 return Response(status=status.HTTP_401_UNAUTHORIZED)
#         except Exception as e:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#     def post(self, request):
#         serializer = OrderSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def put(self, request, id):
#         try:
#             instance = Order.objects.get(id=id)
#         except Order.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#         serializer = OrderSerializer(instance, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, id):
#         try:
#             instance = Order.objects.get(id=id)
#         except Order.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#         instance.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)





    # def post(self, request, *args, **kwargs):
    #     images_data = request.FILES.getlist('images')
    #     inventory_data = request.data.get('inventory', [])
    #     inventory_data = json.loads(inventory_data)
    #     product_data = {
    #         key: value for key, value in request.data.items()
    #         if key not in ['images', 'inventory']
    #     }
    #     product_serializer = ProductSerializer(data=product_data)
    #     product_is_valid = product_serializer.is_valid()
    #     if product_is_valid:
    #         product = product_serializer.save()  
    #         for image_data in images_data:
    #             image_dict = {
    #                 'product': product.id,
    #                 'img': image_data,
    #             }
    #         image_serializer = ImageSerializer(data=images_data, many=True)
    #         for inventory_item in inventory_data:
    #             inventory_item['product'] = product.id
    #         inventory_serializer = InventorySerializer(data=inventory_data, many=True)
    #         inventory_is_valid = inventory_serializer.is_valid()
    #         image_is_valid = image_serializer.is_valid()
    #         if image_is_valid and inventory_is_valid:
    #             image_serializer.save()
    #             inventory_serializer.save()
    #         return Response(status=status.HTTP_201_CREATED)
    #     return Response({
    #         'product_error': product_serializer.errors if not product_is_valid else None,
    #         'image_error': image_serializer.errors if not image_is_valid else None,
    #         'inventory_error': inventory_serializer.errors if not inventory_is_valid else None
    #     }, status=status.HTTP_400_BAD_REQUEST)

    # def post(self, request, *args, **kwargs):
    #     images_data = request.FILES.getlist('images')
    #     inventory_data = request.data.get('inventory', [])
    #     inventory_data = json.loads(inventory_data)

    #     product_data = {
    #         key: value for key, value in request.data.items()
    #         if key not in ['images', 'inventory']
    #     }
    #     serializer = ProductSerializer(data=product_data)
    #     if serializer.is_valid():
    #         product = serializer.save()

    #         for image_data in images_data:
    #             Image.objects.create(product=product, img=image_data)

    #         for inventory_item_data in inventory_data:

    #             Inventory.objects.create(
    #                 product=product,
    #                 size=inventory_item_data['size'],
    #                 color=inventory_item_data['color'],
    #                 quantity=inventory_item_data['quantity']
    #             )

    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)