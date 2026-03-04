#orders/models.py
from django.db import models
from django.conf import settings
from notes.models import Note

class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='orders')
    note = models.ForeignKey(Note, on_delete=models.CASCADE, related_name='orders')
    razorpay_order_id = models.CharField(max_length=100, unique=True, null=True, blank=True)
    razorpay_payment_id = models.CharField(max_length=100, null=True, blank=True)
    razorpay_signature = models.CharField(max_length=255, null=True, blank=True)
    is_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        status = "Paid" if self.is_paid else "Pending"
        return f"{self.user.email} - {self.note.title} ({status})"