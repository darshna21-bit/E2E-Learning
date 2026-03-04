# notes/serializers.py

from rest_framework import serializers
from .models import Note
from orders.models import Order  # Assuming your orders app has the Order model

class NoteListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        # Exposing only public information and preview
        fields = ['id', 'title', 'description', 'price', 'preview_pdf', 'created_at']

class NoteDetailSerializer(serializers.ModelSerializer):
    is_unlocked = serializers.SerializerMethodField()

    class Meta:
        model = Note
        # Exposing public info + the is_unlocked status
        fields = ['id', 'title', 'description', 'price', 'preview_pdf', 'created_at', 'is_unlocked']

    def get_is_unlocked(self, obj):
        request = self.context.get('request')
        
        if request and request.user.is_authenticated:
            # Note: Verify your Order model fields. Assuming it has 'user', 'note', and 'status' or 'is_paid'
            # Adjust the filter kwargs below to exactly match your orders/models.py
            return Order.objects.filter(
                user=request.user, 
                note=obj, 
                is_paid=True  # Change to your exact payment success field (e.g., status='PAID')
            ).exists()
            
        return False