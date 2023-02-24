from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from rest_framework import generics
from dj_rest_auth.registration.views import RegisterView
from rest_framework.response import Response

from .serializers import CustomRegisterSerializer

User = get_user_model()

# Create your views here.


class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save(request)
        headers = self.get_success_headers(serializer.data)
        # method wrote in serializer, passing in new user we just created
        token = serializer.get_token(user)
        return Response({'key': token}, status=201, headers=headers)
