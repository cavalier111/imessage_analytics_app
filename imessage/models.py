from django.db import models
# Create your models here.

class FrequencyList(models.Model):
	user = models.ForeignKey('authentication.CustomUser', on_delete=models.CASCADE)
	frequency_lists_dict = models.JSONField()
	chat_id = models.CharField(max_length=30, default="")
	chat_name = models.CharField(max_length=30, default="")
	chat_type = models.CharField(max_length=30, default="")

	# def __str__(self):
	# 	return self.ROWID
