from django.shortcuts import render
import hashlib
from django.templatetags.static import static
from django.contrib.staticfiles.finders import find
from django.conf import settings
import csv, io
from django.contrib import messages
from .models import Texts
from .utils.wordCloud_utils import getTextFrequencyDictForText
import json
from .serializers import TextsSerializer, UploadSerializer
from rest_framework import generics,status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response


#get endpint, not sure If ill use
class TextsListCreate(generics.ListCreateAPIView):
    queryset = Texts.objects.all()
    serializer_class = TextsSerializer

    
@api_view(['POST'])
def texts_upload(request):
	try:
		stream = io.BytesIO(request.body)
		decodedStream = stream.read().decode('UTF-8')
		io_string = io.StringIO(decodedStream)
		next(io_string)
		for column in csv.reader(io_string, delimiter=',', quotechar="|"):
			print(column)
			if len(column) == 3:
				_, created = Texts.objects.update_or_create(
					ROWID=column[0],
					text=column[1],
					is_from_me=column[2],
				)
		return Response(None, status=status.HTTP_201_CREATED)
	except:
		return Response({"message":'Could not parse CSV',"explanation": 'There was an error parsing the csv'}, status=status.HTTP_400_BAD_REQUEST)



def index(request):
	return render(request, 'index.html')

def success(request):
	return render(request, 'success.html')

@api_view(['GET'])
def frequency_list(request):
	frequencyList = getTextFrequencyDictForText(Texts.objects.values('text'))
	emojiList = getTextFrequencyDictForText(Texts.objects.values('text'), True)
	if frequencyList != None:
		return Response({'frequencyList': frequencyList, 'emojiList': emojiList })
	else:
		return Response({"message":'There was an error creating the vizualization'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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

