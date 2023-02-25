from django.shortcuts import get_object_or_404

from rest_framework import generics
from .models import Channel, Message
from .serializers import ChannelSerializer, MessageSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import IsAuthorOrReadOnly

# ListAPIView is prewired to accept get requests


# API end point to show all channels, List gets many records
class ChannelListAPIView(generics.ListCreateAPIView):
    # what am i getting,  go to chats table and get all objects or chats
    queryset = Channel.objects.all()
    # what it looks like, this is how you need to return them
    serializer_class = ChannelSerializer
    # get request is read only and is allowed, if doing put, post, patch or delete request must be authenticated and logged in
    permission_classes = (IsAuthenticatedOrReadOnly,)


class ChannelDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer
    permission_classes = (IsAuthorOrReadOnly,)


# API end point to show all messages, List gets many records
class MessageListAPIView(generics.ListCreateAPIView):
    # what am i getting,  go to chats table and get all objects or chats
    # queryset = Message.objects.all()
    # what it looks like, this is how you need to return them
    serializer_class = MessageSerializer
    # get request is read only and is allowed, if doing put, post, patch or delete request must be authenticated and logged in
    permission_classes = (IsAuthenticatedOrReadOnly,)

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
    permission_classes = (IsAuthorOrReadOnly,)
