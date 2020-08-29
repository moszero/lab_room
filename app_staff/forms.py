from django import forms
from app_staff.models import Retailer, RetailerUser

class RetailerForm(forms.ModelForm):
    class Meta:
        fields = '__all__'
        model = Retailer


class RetailerUserForm(forms.ModelForm):
    class Meta:
        fields = '__all__'
        model = RetailerUser
