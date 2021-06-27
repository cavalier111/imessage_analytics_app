from django.db import models
# Create your models here.

class FrequencyList(models.Model):
	user = models.ForeignKey('authentication.CustomUser', on_delete=models.CASCADE)
	frequencyListsDict = models.JSONField()
	#to be added, I'll make the extractor add the chat id to the top fo the file... this way it will properly uniquly identify
	# the chat and you won't be able to duplicate
	# chat_id = models.CharField(max_length=30)
	

	# def __str__(self):
	# 	return self.ROWID
