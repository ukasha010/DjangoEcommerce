from django.shortcuts import render
import stripe
from rest_framework.views import APIView , Response
# Create your views here.

stripe.api_key = "sk_test_51OdBhSJx9nIWx8CpWUkEARivyNNaCfBvhrMjpvd8Hq6lJgXVPLP5ymT6e3IEmeTd9UsePAnahekd3hkh3eCBdNo400h87uAIkZ"


class PaymentView(APIView):
    def post(self , request , *args , **kwargs):
        amount = request.data.get('amount')  # Amount in cents
        currency = request.data.get('currency')  # Currency code, e.g., 'usd'
        description = request.data.get('description')

        payment_intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
            description=description
        )
        return Response({'client_secret': payment_intent.client_secret})