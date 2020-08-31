from django.shortcuts import render
from django.views.generic import ListView,FormView,DeleteView,UpdateView, TemplateView, RedirectView
from django.http import HttpResponseRedirect
from django.urls import reverse, reverse_lazy

import json

from django.contrib.auth import forms as auth_forms
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth import authenticate

from app_staff.forms import RetailerForm, RetailerUserForm

from app_staff.models import RetailerUser, Retailer
from app_staff.models import AdminConfiguration

class StaffUpdate(UpdateView):
    template_name = 'staff/staff_update.html'
    model = Retailer
    form_class = RetailerForm
    success_url = reverse_lazy('staff:staff_list')

class StaffDetail(UpdateView):
    template_name = 'staff/staff_detail.html'
    model = Retailer
    form_class = RetailerForm
    success_url = reverse_lazy('staff:staff_list')

class staff_add(TemplateView):
    template_name = 'staff/staff_add.html'

class staff_list(ListView):
    template_name = 'staff/staff_list.html'
    model = Retailer
    paginate_by = 200


class StaffLoginView(FormView):
    template_name = 'staff/login_new.html'
    form_class = auth_forms.AuthenticationForm

    def dispatch(self, request, *args, **kwargs):

        if self.request.user.is_authenticated:
            if (
                self.request.user.retailer_user.role_type ==
                self.request.user.retailer_user.ROLE_TYPE_LEDGER_VIEW
            ):
                return HttpResponseRedirect(
                    reverse('index'))

            return HttpResponseRedirect(reverse('index'))

        return super(StaffLoginView, self).dispatch(request, *args, **kwargs)

    def form_valid(self, form):
        # obj = form.save(commit=False)
        # print(obj)
        # print(obj.dict)
        print(123)
        print(form)
        user = form.get_user()
        auth_login(self.request, user)

        return HttpResponseRedirect(reverse('index'))

    def form_invalid(self, form):
        # name = json.loads(form)
        # for key, value in self.items() :
        #     print (key, value)
        print(456)
        print(form)
        return super(StaffLoginView, self).form_invalid(form)

    def get_context_data(self, **kwargs):
        context = super(StaffLoginView, self).get_context_data(**kwargs)
        try:
            admin_config = AdminConfiguration.objects.get(id=1)
            context.update({
                'config': admin_config
            })
        except AdminConfiguration.DoesNotExist:
            pass
        return context

class StaffLogoutView(RedirectView):

    def dispatch(self, request, *args, **kwargs):
        auth_logout(self.request)
        return super(StaffLogoutView, self).dispatch(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        return HttpResponseRedirect(reverse('index'))

class StaffRegisterView(FormView):
    form_class = auth_forms.UserCreationForm
    template_name = 'staff/register.html'

    def dispatch(self, request, *args, **kwargs):
        if self.request.user.is_authenticated:
            return HttpResponseRedirect(reverse('index'))

        return super(StaffRegisterView, self).dispatch(request, *args, **kwargs)

    def form_valid(self, form):
        # register new user in the system
        user = form.save()

        # Create Retailer
        retailer_form_kwargs = {
            'name': (
                '%s %s' % (user.first_name, user.last_name) if
                user.first_name else user.username),
            'slug': (
                '%s-%s' % (user.first_name, user.last_name) if
                user.first_name else user.username)
        }
        retailer_form = RetailerForm(retailer_form_kwargs)
        if retailer_form.is_valid():
            retailer = retailer_form.save()

            retailer_user_kwargs = {
                'retailer': retailer.id,
                'user': user.id,
                'role_type': RetailerUser.ROLE_TYPE_LEDGER_VIEW,
            }

            retailer_user_form = RetailerUserForm(retailer_user_kwargs)
            if retailer_user_form.is_valid():
                retailer_user_form.save()

        username = form.cleaned_data.get('username')
        raw_password = form.cleaned_data.get('password1')
        auth_user = authenticate(username=username, password=raw_password)
        auth_login(self.request, auth_user)

        return HttpResponseRedirect(reverse('index'))

    def form_invalid(self, form):
        return super(StaffRegisterView, self).form_invalid(form)

    def get_context_data(self, **kwargs):
        context = super(StaffRegisterView, self).get_context_data(**kwargs)
        if self.request.POST:
            context.update({
                'username': self.request.POST.get('username'),
                'password1': self.request.POST.get('password1'),
                'password2': self.request.POST.get('password2')
            })

        return context
