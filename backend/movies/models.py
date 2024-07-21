from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=255)
    overview = models.TextField()
    genre = models.CharField(max_length=255)
    poster_path = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.title
