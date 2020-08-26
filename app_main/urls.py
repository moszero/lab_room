from django.contrib import admin
from django.urls import path, include
from . import views
from django.conf.urls import url

urlpatterns = [
    url(r'^lab_01/$', views.lab_01.as_view(), name='lab_01'),
    # url(r'^Split_set/$', views.Split_set.as_view(), name='Split_set'),
    # url(r'^tools/db_modify/$', views.db_modify, name='db_modify'),
]
