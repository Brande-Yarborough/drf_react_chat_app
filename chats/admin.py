from django.contrib import admin

from .models import Channel, Message

# Register your models here.
# adds channel and message table to django admin site
admin.site.register(Channel)
admin.site.register(Message)
