from django.db import models
# Create your models here.

class Texts(models.Model):
    ROWID = models.CharField(max_length=150)
    text = models.CharField(max_length=50)
    is_from_me = models.CharField(max_length=50)
    def __str__(self):
        return self.ROWID