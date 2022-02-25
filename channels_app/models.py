import uuid

from django.core.exceptions import ValidationError
from django.db import models

def validate_message_content(content):
    if content is None or content == "" or content.isspace():
        raise ValidationError(
            'Content is empty/invalid',
            code='invalid',
            params={'content': content},
        )


class Message(models.Model):

    id = models.UUIDField(
        primary_key=True,
        null=False,
        default=uuid.uuid4,
        editable=False
    )
    author = models.ForeignKey(
        'authentication.CustomUser',
        blank=False,
        null=False,
        related_name='author_messages',
        on_delete=models.CASCADE
    )

    chatInternalId = models.CharField(blank=True, max_length=50)

    content = models.TextField(validators=[validate_message_content])
    created_at = models.DateTimeField(auto_now_add=True, blank=True)

    def get_recent_messages(chatId):
        return Message.objects.filter(chatInternalId=chatId).order_by('-created_at').all()