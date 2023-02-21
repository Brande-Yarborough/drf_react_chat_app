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


class ChannelDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer


# API end point to show all messages, List gets many records
class MessageListAPIView(generics.ListCreateAPIView):
    # what am i getting,  go to chats table and get all objects or chats
    # queryset = Message.objects.all()
    # what it looks like, this is how you need to return them
    serializer_class = MessageSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        # https://www.django-rest-framework.org/api-guide/filtering/#filtering-against-query-parameters
        channel = self.request.query_params.get('channel')
        return Message.objects.filter(channel=channel)

    # target for post request

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class MessageDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
