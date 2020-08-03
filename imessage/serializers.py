from rest_framework import serializers
from .models import Texts

class TextsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Texts
        fields = ('ROWID', 'text', 'is_from_me')

class UploadSerializer(serializers.Serializer):
    data = serializers.CharField()