from django.shortcuts import render
from django.views.generic import ListView,FormView,DeleteView,UpdateView, TemplateView, RedirectView, View
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse, reverse_lazy
from django.utils import timezone
from django.shortcuts import get_object_or_404, redirect

from swapper import load_model
Notification = load_model('notifications', 'Notification')

from django.db.models import F

from django.contrib.auth import forms as auth_forms
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth import authenticate

from django.contrib.auth.models import User

from app_main.models import pd_Notification


from django.contrib.auth.decorators import login_required
from notifications.signals import notify
import random

import pandas as pd
import string


class mark_as_read(View):
    def __init__(self, *args, **kwargs):
        super(mark_as_read, self).__init__(*args, **kwargs)
        self.customer = None

    def post(self, request, *args, **kwargs):
        id = self.request.POST.get('id')
        notification_id = int(id)
        notification = get_object_or_404(
            Notification, recipient=request.user, id=notification_id)
        notification.mark_as_read()
        return JsonResponse({'error': ''})



class TaskDetailView(TemplateView):
    template_name = 'mytask/task_detail.html'

    def get_context_data(self, **kwargs):
        context = super(TaskDetailView, self).get_context_data(**kwargs)
        task = pd_Notification.objects.get(id=self.kwargs.get('task_id'))

        context.update({
            'task': task,
        })
        return context
