from django.db import models
from django.contrib.auth.models import User
from app_main.models import DatedModel

# Create your models here.
class AdminConfiguration(models.Model):
    production = models.BooleanField(default=False)
    demo = models.BooleanField(default=False)
    local = models.BooleanField(default=False)

class Retailer(DatedModel):
    name = models.CharField(max_length=100, null=True, blank=True)
    slug = models.SlugField(null=True, blank=True)
    phone = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(max_length=264, null=True, blank=True)
    package = models.CharField(max_length=200, null=True, blank=True)
    package_price = models.CharField(max_length=200, null=True, blank=True)
    package_expiry = models.DateField(blank=True, null=True)
    logo = models.ImageField(
        upload_to='pics/', max_length=1024,
        blank=True, null=True
    )

    def __unicode__(self):
        return self.name


class RetailerUser(models.Model):
    ROLE_TYPE_OWNER = 'owner'
    ROLE_TYPE_DATA_ENTRY_USER = 'data_entry_user'
    ROLE_TYPE_SALESMAN = 'salesman'
    ROLE_TYPE_VIEW_ACCOUNT = 'account_viewer'
    ROLE_TYPE_LEDGER_VIEW = 'ledger_viewer'
    ROLE_TYPE_A = 'class_A'

    ROLE_TYPES = (
        (ROLE_TYPE_OWNER, 'Owner'),
        (ROLE_TYPE_DATA_ENTRY_USER, 'Data Entry User'),
        (ROLE_TYPE_SALESMAN, 'Salesman'),
        (ROLE_TYPE_VIEW_ACCOUNT, 'Account Viewer'),
        (ROLE_TYPE_LEDGER_VIEW, 'Ledger Viewer'),
        (ROLE_TYPE_A, 'Class A'),
    )

    user = models.OneToOneField(User, related_name='retailer_user',on_delete=models.CASCADE)
    retailer = models.ForeignKey(Retailer, related_name='u_retailer',on_delete=models.CASCADE)
    role_type = models.CharField(
        max_length=100, choices=ROLE_TYPES, default=ROLE_TYPE_OWNER
    )

    def __unicode__(self):
        return self.user.username
