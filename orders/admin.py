#orders/admin.py
from django.contrib import admin
from .models import Order

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    # This shows these specific columns in the admin dashboard
    list_display = ('user', 'note', 'is_paid', 'created_at')
    
    # This adds a filter box on the right side so you can easily find who paid
    list_filter = ('is_paid', 'created_at')
    
    # This adds a search bar to look up specific users or Razorpay IDs
    search_fields = ('user__email', 'razorpay_order_id', 'razorpay_payment_id')