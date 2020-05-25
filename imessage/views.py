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
	request.session['page'] = 'index.html'
	return render(request, 'index.html')

def success(request):
	request.session['page'] = 'success.html'
	return render(request, 'success.html')


def wordcloud(request):
	request.session['page'] = 'wordcloud.html'
	return render(request, 'wordcloud.html')
def emojicloud(request):
	request.session['page'] = 'emojicloud.html'
	return render(request, 'emojicloud.html')

def tapbacks(request):
	request.session['page'] = 'tapbacks.html'

	return render(request, 'tapbacks.html')


def compare(request):
	request.session['page'] = 'compare.html'

	return render(request, 'compare.html')


def calmap(request):
	request.session['page'] = 'calmap.html'

	return render(request, 'calmap.html')


def monthly(request):
	request.session['page'] = 'monthly.html'
	return render(request, 'monthly.html')

def weekly(request):
	request.session['page'] = 'weekly.html'
	return render(request, 'weekly.html')

def daily(request):
	request.session['page'] = 'daily.html'

	return render(request, 'daily.html')

def weekday(request):
	request.session['page'] = 'weekday.html'

	return render(request, 'weekday.html')


def hourly(request):
	request.session['page'] = 'hourly.html'

	return render(request, 'hourly.html')

def polWeekDay(request):
	request.session['page'] = 'polWeekDay.html'

	return render(request, 'polWeekDay.html')
def polWeek(request):
	request.session['page'] = 'polWeek.html'

	return render(request, 'polWeek.html')
def emotions(request):
	request.session['page'] = 'emotions.html'

	return render(request, 'emotions.html')
def emotionsMonth(request):
	request.session['page'] = 'emotionsMonth.html'
	return render(request, 'emotionsMonth.html')
def sarcasm(request):
	request.session['page'] = 'sarcasm.html'
	return render(request, 'sarcasm.html')
def thanks(request):
	request.session['page'] = 'thanks.html'
	return render(request, 'thanks.html')

