from django.shortcuts import render
from django.views.generic import ListView,FormView,DeleteView,UpdateView, TemplateView, RedirectView, View
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse, reverse_lazy
from django.utils import timezone
from django.shortcuts import get_object_or_404, redirect

from django.db.models import F

from django.contrib.auth import forms as auth_forms
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth import authenticate

from django.contrib.auth.models import User

from app_main.models import Notification


from django.contrib.auth.decorators import login_required
from notifications.signals import notify
import random

import pandas as pd
import string


# Create your views here.
def index(request):
    return render(request,'index.html')

class lab_01(TemplateView):
    template_name = 'lab/block_lab1.html'

class live_tester(TemplateView):
    template_name = 'notification_template/test_live.html'

    def get_context_data(self, **kwargs):
        context = super(live_tester, self).get_context_data(**kwargs)
        # task = Notification.objects.get(id=self.kwargs.get('task_id'))

        users = User.objects.all()

        context.update({
            'all_user': users,
        })
        return context

def make_notification(request):

    the_notification = random.choice([
        'reticulating splines',
        'cleaning the car',
        'jumping the shark',
        'testing the app',
        'attaching the plumbus',
    ])

    notify.send(sender=request.user, recipient=request.user,
                verb='you asked for a notification - you are ' + the_notification)

def mark_all_as_read(request):
    request.user.notifications.mark_all_as_read()

    _next = request.GET.get('next')

    if _next:
        return redirect(_next)
    return redirect('index')

def mark_all_as_unread(request):
    request.user.notifications.mark_all_as_unread()

    _next = request.GET.get('next')

    if _next:
        return redirect(_next)
    return redirect('index')

class noti(View):
    def __init__(self, *args, **kwargs):
        super(noti, self).__init__(*args, **kwargs)
        self.customer = None

    def post(self, request, *args, **kwargs):
        x = self.request.POST.get('target')
        text = self.request.POST.get('text')
        try:
            recipient = User.objects.get(username=x)
            notify.send(sender=request.user, recipient=recipient, verb=' ' + text + ' ' + x)
            return JsonResponse({'error': ''})
        except:
            return JsonResponse({'error': 'error sending noti'})

class my_task(ListView):
    template_name = 'mytask/task_list.html'
    model = Notification

    def get_context_data(self, **kwargs):
        context = super(my_task, self).get_context_data(**kwargs)

        context.update({
            'data': Notification.objects.all(),
        })

        return context


from django.db.models.signals import post_save
from notifications.signals import notify

def my_handler(sender, instance, created, **kwargs):
    print('in the case!!!')
    notify.send(instance, verb='was saved')

def add_my_task(request):
    temp = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(6))
    Notification.objects.create(name=temp)
    notify.send(user, recipient=user, verb='you reached level 10')
    return render(request,'index.html')

# post_save.connect(my_handler, sender=Notification)


class TaskDetailView(TemplateView):
    template_name = 'mytask/task_detail.html'

    def get_context_data(self, **kwargs):
        context = super(TaskDetailView, self).get_context_data(**kwargs)
        task = Notification.objects.get(id=self.kwargs.get('task_id'))

        context.update({
            'task': task,
        })
        return context
