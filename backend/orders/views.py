#orders/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
import razorpay
from .models import Order
from notes.models import Note

# Initialize the Razorpay Client
client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

class CreateOrderAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        note_id = request.data.get('note_id')
        
        try:
            note = Note.objects.get(id=note_id)
        except Note.DoesNotExist:
            return Response({"error": "Note not found"}, status=status.HTTP_404_NOT_FOUND)

        amount_in_paise = int(note.price * 100) 

        try:
            # Create Razorpay order
            razorpay_order = client.order.create({
                "amount": amount_in_paise,
                "currency": "INR",
                "payment_capture": "1" 
            })
        except Exception as e:
            # This forces Postman to show exactly where the error came from
            return Response({"error": f"Proof it is Razorpay: {repr(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Save pending order in DB
        order = Order.objects.create(
            user=request.user,
            note=note,
            razorpay_order_id=razorpay_order['id'],
            is_paid=False 
        )

        return Response({
            "order_id": order.id,
            "razorpay_order_id": razorpay_order['id'],
            "amount": amount_in_paise,
            "currency": "INR",
            "razorpay_key": settings.RAZORPAY_KEY_ID
        }, status=status.HTTP_201_CREATED)


class VerifyPaymentAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # 1. Grab the 3 pieces of data React sends after the popup closes
        razorpay_order_id = request.data.get('razorpay_order_id')
        razorpay_payment_id = request.data.get('razorpay_payment_id')
        razorpay_signature = request.data.get('razorpay_signature')

        # 2. Mathematically verify the signature with Razorpay's secret math
        try:
            client.utility.verify_payment_signature({
                'razorpay_order_id': razorpay_order_id,
                'razorpay_payment_id': razorpay_payment_id,
                'razorpay_signature': razorpay_signature
            })
        except razorpay.errors.SignatureVerificationError:
            # If the math fails, it's a fake request!
            return Response({"error": "Payment verification failed. Invalid signature."}, status=status.HTTP_400_BAD_REQUEST)

        # 3. If legit, find the pending order in our database
        try:
            order = Order.objects.get(razorpay_order_id=razorpay_order_id, user=request.user)
        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)

        # 4. BOOM. Set to PAID and save the receipt details!
        order.razorpay_payment_id = razorpay_payment_id
        order.razorpay_signature = razorpay_signature
        order.is_paid = True
        order.save()

        # THIS is the exact moment that `is_unlocked` becomes True in your Notes API!
        return Response({"message": "Payment successful! Note is now unlocked."}, status=status.HTTP_200_OK)