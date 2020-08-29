from django.contrib import admin
from django.urls import path, include
from . import views
from django.conf.urls import url

urlpatterns = [
url(r'^staff/staff_list/$', views.staff_list.as_view(), name='staff_list'),
url(r'^staff/staff_add/$', views.staff_add.as_view(), name='staff_add'),
url(r'^staff/staff_login/$', views.StaffLoginView.as_view(), name='staff_login'),
url(r'^staff/staff_logout/$', views.StaffLogoutView.as_view(), name='staff_logout'),
url(r'^staff/staff_register/$', views.StaffRegisterView.as_view(), name='staff_register'),
url(r'^staff/staff_views/(?P<pk>\d+)/$', views.StaffDetail.as_view(), name='staff_detail'),
url(r'^staff/staff_update/(?P<pk>\d+)/$', views.StaffUpdate.as_view(), name='staff_update'),
]
