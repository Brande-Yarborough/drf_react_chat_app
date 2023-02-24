from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework.authtoken.models import Token
# from dj_rest_auth.models import TokenModel
from dj_rest_auth.serializers import TokenSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer


class CustomTokenSerializer(TokenSerializer):
    username = serializers.ReadOnlyField(source="user.username")

    class Meta(TokenSerializer.Meta):
        fields = TokenSerializer.Meta.fields + ('username',)


class CustomRegisterSerializer(RegisterSerializer):
    def get_token(self, user):
        # get or create token for user we just created, user=user we just created in registration
        token, _ = Token.objects.get_or_create(user=user)
        return token.key
