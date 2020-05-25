from django.shortcuts import render
import hashlib
from django.templatetags.static import static
from django.contrib.staticfiles.finders import find
from django.conf import settings
import csv, io
from django.contrib import messages
from .models import Texts

# Create your views here.
# one parameter named request
def texts_upload(request):
	# declaring template
	template = "index.html"
	data = Texts.objects.all()
	# prompt is a context variable that can have different values  depending on their context
	prompt = {
		'order': 'Order of the CSV should be name, ROWID, text, is_from_me',
		'texts': data
			  }
	# GET request returns the value of the data with the specified key.
	if request.method == "GET":
		return render(request, template, prompt)
	csv_file = request.FILES['file']
	# let's check if it is a csv file
	if not csv_file.name.endswith('.csv'):
		messages.error(request, 'File must be csv, please try again with a csv file')
		return render(request, template, prompt)
	data_set = csv_file.read().decode('UTF-8')
	# setup a stream which is when we loop through each line we are able to handle a data in a stream
	io_string = io.StringIO(data_set)
	next(io_string)
	for column in csv.reader(io_string, delimiter=',', quotechar="|"):
		print(column)
		if len(column) == 3:
			_, created = Texts.objects.update_or_create(
				ROWID=column[0],
				text=column[1],
				is_from_me=column[2],
			)
	context = {}
	return render(request, 'success.html', context)

def index(request):
	return render(request, 'index.html')

def success(request):
	return render(request, 'success.html')

def wordcloud(request):
	return render(request, 'wordcloud.html')

def emojicloud(request):
	return render(request, 'emojicloud.html')

def tapbacks(request):
	return render(request, 'tapbacks.html')

def compare(request):
	return render(request, 'compare.html')


def calmap(request):
	return render(request, 'calmap.html')

def monthly(request):
	return render(request, 'monthly.html')

def weekly(request):
	return render(request, 'weekly.html')

def daily(request):
	return render(request, 'daily.html')

def weekday(request):
	return render(request, 'weekday.html')


def hourly(request):
	return render(request, 'hourly.html')

def polWeekDay(request):
	return render(request, 'polWeekDay.html')

def polWeek(request):
	return render(request, 'polWeek.html')

def emotions(request):
	return render(request, 'emotions.html')

def emotionsMonth(request):
	return render(request, 'emotionsMonth.html')

def sarcasm(request):
	return render(request, 'sarcasm.html')

def thanks(request):
	return render(request, 'thanks.html')

