from django.contrib import admin
from django.urls import path, include
from . import views
from django.conf.urls import url

urlpatterns = [
    url(r'^lab_01/$', views.lab_01.as_view(), name='lab_01'),
    url(r'^my_task/$', views.my_task.as_view(), name='my_task'),
    url(r'^add_my_task/$', views.add_my_task, name='add_my_task'),
    # url(r'^Split_set/$', views.Split_set.as_view(), name='Split_set'),
    # url(r'^tools/db_modify/$', views.db_modify, name='db_modify'),
]
