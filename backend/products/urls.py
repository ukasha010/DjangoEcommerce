from django.urls import path
from .views import ProductView , AddToCartView, OrderView

urlpatterns = [
    path('products/', ProductView.as_view(), name='ProductSave'),
    path('products/<int:product_id>/', ProductView.as_view(), name='Product'),
    path('cart/', AddToCartView.as_view(), name='cart'),
    path('cart/<int:id>/', AddToCartView.as_view(), name='cart-detail'),
    path('orders/', OrderView.as_view(), name='order-list'),
    path('orders/<int:id>/', OrderView.as_view(), name='order-detail'),
]
