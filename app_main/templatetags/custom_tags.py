from django.utils.html import format_html
from django import template
register = template.Library()

@register.simple_tag
def text_function(x):
    return 'Product.objects.all()' + str(x)

@register.simple_tag
def pd_live_notify_list(list_class='live_notify_list'):
    html = "<ul class='{list_class}'></ul>1234".format(list_class=list_class)
    print(html)
    return format_html(html)
