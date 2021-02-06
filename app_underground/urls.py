from django.contrib import admin
from django.urls import path, include
from . import views
from django.conf.urls import url
from app_staff.views import change_password

urlpatterns = [
url(r'^TaskDetailView/$', views.TaskDetailView.as_view(), name='TaskDetailView'),

]
