from django.shortcuts import render
import hashlib
from django.templatetags.static import static
from django.contrib.staticfiles.finders import find
from django.conf import settings
import csv, io
from django.contrib import messages
from .models import FrequencyList
from .utils.wordCloud_utils import createFrequencyListsDict
import json
from .serializers import UploadSerializer
from rest_framework import generics,status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from django.http import HttpResponse
from django.contrib.staticfiles.storage import staticfiles_storage
    
@api_view(['POST'])
def texts_upload(request):
	try:
		stream = io.BytesIO(request.body)
		decodedStream = stream.read().decode('UTF-8')
		io_string = io.StringIO(decodedStream)
		next(io_string)
		next(io_string)
		next(io_string)
		fieldnames = ("ROWID", "attributedBody", "text", "date", "balloon_bundle_id", "associated_message_type", "cache_has_attachments", "is_from_me")
		texts = list(csv.DictReader(io_string, fieldnames, delimiter=',', quotechar="|"))
		texts = texts[1:len(texts)-1]
		freqList = json.dumps(createFrequencyListsDict(texts))
		print(freqList)
		FrequencyList.objects.create(user = request.user, frequencyListsDict= freqList )
		print('created!')
		return Response(None, status=status.HTTP_201_CREATED)
	except Exception as e:
		print(str(e))
		return Response({"message":'There was an error parsing the csv'}, status=status.HTTP_400_BAD_REQUEST)



def index(request):
	return render(request, 'index.html')

def success(request):
	return render(request, 'success.html')

@api_view(['GET'])
def frequency_list(request):
	#will have something in the UI where you can select your chats
	# return Response(FrequencyList.objects.values('frequencyListsDict').filter(chat_id=request.chat_id && user==request.user))

	# try:
	# 	return Response(getTextFrequencyDictForText(Texts.objects.values('text')))
	# except Exception as e:
	# 	return Response({"message":'There was an error creating the vizualization', "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def downloadTextExtractor(request):
	# zip_file = open("/Users/RobbyKlemchek/messagesV2/imessage_analytics_app/imessage/static/admin/img/retrieveImessage.zip", 'rb')
	response = HttpResponse(zip_file, content_type='application/force-download')
	response['Content-Disposition'] = 'attachment; filename="%s"' % 'foo.zip'
	return response
def emojicloud(request):
	js_freqeuncy_list = getTextFrequencyDictForText(Texts.objects.values('text'), True)
	return render(request, 'wordcloud.html', {'freqeuncy_list': js_freqeuncy_list, "emoji": True })

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

