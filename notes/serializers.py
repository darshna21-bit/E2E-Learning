from rest_framework import serializers
from .models import Note
from orders.models import Order 

class NoteListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'description', 'price', 'preview_pdf', 'created_at']

class NoteDetailSerializer(serializers.ModelSerializer):
    is_unlocked = serializers.SerializerMethodField()
    main_pdf = serializers.SerializerMethodField()

    class Meta:
        model = Note
        fields = ['id', 'title', 'description', 'price', 'preview_pdf', 'main_pdf', 'is_unlocked', 'created_at']

    def get_is_unlocked(self, obj):
        # 1. Grab the user making the request
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            # 2. Check the Order database: Did this specific user pay for this specific note?
            return Order.objects.filter(user=request.user, note=obj, is_paid=True).exists()
        return False

    def get_main_pdf(self, obj):
        # 3. Only reveal the PDF file path if the database confirms they paid
        if self.get_is_unlocked(obj):
            request = self.context.get('request')
            if obj.main_pdf and request:
                return request.build_absolute_uri(obj.main_pdf.url)
            return obj.main_pdf.url if obj.main_pdf else None
        
        # Keep it locked!
        return None