# notes/views.py

from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Note
from .serializers import NoteListSerializer, NoteDetailSerializer

class NoteListAPIView(generics.ListAPIView):
    queryset = Note.objects.all().order_by('-created_at')
    serializer_class = NoteListSerializer
    permission_classes = [AllowAny]

class NoteDetailAPIView(generics.RetrieveAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteDetailSerializer
    permission_classes = [AllowAny]
