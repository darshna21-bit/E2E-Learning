from django.db import models


class Note(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    preview_pdf = models.FileField(upload_to="previews/")
    main_pdf = models.FileField(upload_to="notes/")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
