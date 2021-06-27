from rest_framework import serializers
from .models import FrequencyList

class UploadSerializer(serializers.Serializer):
    data = serializers.CharField()