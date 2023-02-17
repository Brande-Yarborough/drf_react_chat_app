from rest_framework import serializers
from .models import Channel, Message


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ('id', 'title',)


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'  # do I need all here or text, channel, author?
