# notes/urls.py

from django.urls import path
from .views import NoteListAPIView, NoteDetailAPIView

urlpatterns = [
    path('', NoteListAPIView.as_view(), name='note-list'),
    path('<int:pk>/', NoteDetailAPIView.as_view(), name='note-detail'),
]