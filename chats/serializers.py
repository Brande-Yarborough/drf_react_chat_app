from rest_framework import serializers
from .models import Channel, Message


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ('id', 'title',)


class MessageSerializer(serializers.ModelSerializer):
    # https://www.django-rest-framework.org/api-guide/fields/#serializermethodfield
    is_author = serializers.SerializerMethodField('get_author_status')

    # serializer method field is getting author status as boolean, to return and determine if author is equal to user
    # will use this to determine if edit and delete buttons will show up for specific author/user
    def get_author_status(self, message):
        return message.author == self.context.get('request').user

    class Meta:
        model = Message
        fields = '__all__'
