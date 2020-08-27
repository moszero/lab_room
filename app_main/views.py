from django.shortcuts import render
from django.views.generic import ListView,FormView,DeleteView,UpdateView, TemplateView, RedirectView, View
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse, reverse_lazy
from django.utils import timezone

from django.db.models import F

from django.contrib.auth import forms as auth_forms
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth import authenticate

from app_main.models import Notification

import pandas as pd
import string
import random

# Create your views here.
def index(request):
    return render(request,'index.html')

class lab_01(TemplateView):
    template_name = 'lab/lab1.html'


class my_task(ListView):
    template_name = 'mytask/task_list.html'
    model = Notification

    def get_context_data(self, **kwargs):
        context = super(my_task, self).get_context_data(**kwargs)

        context.update({
            'data': Notification.objects.all(),
        })

        return context

def add_my_task(request):
    temp = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(6))
    Notification.objects.create(name=temp)
    return render(request,'index.html')
