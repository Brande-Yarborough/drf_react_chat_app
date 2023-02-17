from django.urls import path

from .views import ChannelListAPIView, MessageListAPIView

urlpatterns = [
    path('', ChannelListAPIView.as_view()),
    path('messages/', MessageListAPIView.as_view()),
]
