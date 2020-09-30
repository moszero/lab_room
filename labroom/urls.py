"""labroom URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from app_main import views
from django.conf import settings
from django.conf.urls.static import static

from django.conf.urls import url
import notifications.urls

from app_main.views import (make_notification, mark_all_as_read, mark_all_as_unread)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.index, name='index'),
    path('main/', include(('app_main.urls','main'),namespace='main')),
    path('staff/',include(('app_staff.urls','staff'), namespace='staff')),
    url('^inbox/notifications/', include(notifications.urls, namespace='notification')),
    path('test_make/', make_notification),
    path('mark_all_as_read/', mark_all_as_read),
    path('mark_all_as_unread/', mark_all_as_unread),
    path('formbuilder/',views.index0, name='index0'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
