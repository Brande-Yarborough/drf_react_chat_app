from django.urls import path

from .views import ChannelListAPIView, MessageListAPIView, ChannelDetailAPIView, MessageDetailAPIView

urlpatterns = [
    # integer that has primary key
    path('<int:pk>', ChannelDetailAPIView.as_view()),
    path('channels/', ChannelListAPIView.as_view()),
    path('messages/', MessageListAPIView.as_view()),
    path('messages/<int:pk>/', MessageDetailAPIView.as_view()),
]
