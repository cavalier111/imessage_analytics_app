from django.shortcuts import render
import hashlib
from django.templatetags.static import static
from django.contrib.staticfiles.finders import find
from django.conf import settings
import csv, io
from django.contrib import messages
from .models import FrequencyList
from .utils.wordCloud_utils import createFrequencyListsDict, addDateFormatted
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
		if len(FrequencyList.objects.filter(user=request.user)) > 5:
			#maybe use an exception here
			return Response({"message":'Maximum chats allowed is 5, please delete chats to upload more'}, status=status.HTTP_400_BAD_REQUEST)
		stream = io.BytesIO(request.body)
		decodedStream = stream.read().decode('UTF-8')
		io_string = io.StringIO(decodedStream)
		next(io_string)
		next(io_string)
		next(io_string)
		texts_csv_reader = csv.reader(io_string, delimiter=',', quoting=csv.QUOTE_ALL)
		#get meta data
		next(texts_csv_reader)
		chat_id = next(texts_csv_reader)[0]
		chat_name = next(texts_csv_reader)[0]
		chat_type = next(texts_csv_reader)[0]
		field_names = next(texts_csv_reader)
		print('chat_id', chat_id, 'chat_name', chat_name, 'chat_type', chat_type, 'field_names', field_names)
		# if the chat name already 
		users_chat_names = list(FrequencyList.objects.values_list('chat_name', flat=True).filter(user=request.user, chat_name__startswith=chat_name))
		print('chat_name', chat_name, 'users_chat_names', users_chat_names)
		if len(users_chat_names):
			# this will be the upload 
			# return Response({"message":"This chat already exists, please delete the current chat if you'd like to reupload"}, status=status.HTTP_400_BAD_REQUEST)
			# this will be logic for live chat only, but using it for now for testing
			chat_name += ' ' + str(len(users_chat_names))
		texts = list(csv.DictReader(io_string, fieldnames=field_names, delimiter=',', quoting=csv.QUOTE_ALL))
		# last element will be WebKitFormBoundary
		texts_data = texts[0:len(texts)-1]
		texts_data = list(map(addDateFormatted, texts_data))
		print('texts_data', texts_data)
		freqList = createFrequencyListsDict(texts_data)
		FrequencyList.objects.create(user = request.user, frequency_lists_dict = freqList, chat_id = chat_id, chat_name = chat_name, chat_type = chat_type)
		print('created!')
		return Response(None, status=status.HTTP_201_CREATED)
	except Exception as e:
		print('There was an error parsing the csv', e)
		return Response({"message":'There was an error parsing the csv'}, status=status.HTTP_400_BAD_REQUEST)



def index(request):
	return render(request, 'index.html')

def success(request):
	return render(request, 'success.html')

@api_view(['GET'])
def user_chats(request):
	return Response(FrequencyList.objects.values('chat_name','id').filter(user=request.user))

@api_view(['GET', 'DELETE'])
def frequency_list(request, chatId):
	if request.method == 'GET':
		# also add some error handling here
		return Response(FrequencyList.objects.values('frequency_lists_dict','id','chat_name','chat_type').filter(user=request.user, id=chatId).first())
	elif request.method == 'DELETE':
		FrequencyList.objects.filter(user=request.user, id=chatId).first().delete()
		return Response(None, status=status.HTTP_204_NO_CONTENT)
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

