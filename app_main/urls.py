from django.contrib import admin
from django.urls import path, include
from . import views
from django.conf.urls import url

urlpatterns = [
    url(r'^lab_01/$', views.lab_01.as_view(), name='lab_01'),
    url(r'^my_task/$', views.my_task.as_view(), name='my_task'),
    url(r'^add_my_task/$', views.add_my_task, name='add_my_task'),
    url(r'^test/$', views.live_tester.as_view(), name='live_tester'),
    url(r'^task/(?P<task_id>\d+)/detail/$', views.TaskDetailView.as_view(), name='TaskDetailView'),
    url(r'^noti/$', views.noti.as_view(), name='noti'),
    url(r'^mark-as-read/$', views.mark_as_read.as_view(), name='mark_as_read'),
    url(r'^perspective/$', views.perspective.as_view(), name='perspective'),
    # url(r'^Split_set/$', views.Split_set.as_view(), name='Split_set'),
    # url(r'^tools/db_modify/$', views.db_modify, name='db_modify'),
]
