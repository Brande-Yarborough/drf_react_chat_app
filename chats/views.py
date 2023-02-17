from django.shortcuts import get_object_or_404

from rest_framework import generics
from .models import Channel, Message
from .serializers import ChannelSerializer, MessageSerializer

# ListAPIView is prewired to accept get requests


# API end point to show all channels, List gets many records
class ChannelListAPIView(generics.ListCreateAPIView):
    # what am i getting,  go to chats table and get all objects or chats
    queryset = Channel.objects.all()
    # what it looks like, this is how you need to return them
    serializer_class = ChannelSerializer


# API end point to show all messages, List gets many records
class MessageListAPIView(generics.ListCreateAPIView):
    # what am i getting,  go to chats table and get all objects or chats
    queryset = Message.objects.all()
    # what it looks like, this is how you need to return them
    serializer_class = MessageSerializer
