from django.contrib import admin
from django.urls import path
from . import views

from django.conf.urls import include, url
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^$', views.texts_upload, name = 'texts_upload'),
    url(r'^home/$', views.texts_upload, name = 'texts_upload'),
    url(r'^success/$', views.success, name = 'success'),
    url(r'^wordcloud/$', views.wordcloud,name = 'wordcloud'),
    url(r'^emojicloud/$', views.emojicloud,name = 'emojicloud'),
    url(r'^tapbacks/$', views.tapbacks,name = 'tapbacks'),
    url(r'^compare/$', views.compare,name = 'compare'),
    url(r'^calmap/$', views.calmap,name = 'calmap'),
    url(r'^monthly/$', views.monthly,name = 'monthly'),
    url(r'^weekly/$', views.weekly,name = 'weekly'),
    url(r'^daily/$', views.daily,name = 'daily'),
    url(r'^weekday/$', views.weekday,name = 'weekday'),
    url(r'^hourly/$', views.hourly,name = 'hourly'),
    url(r'^polWeekDay/$', views.polWeekDay,name = 'polWeekDay'),
    url(r'^polWeek/$', views.polWeek,name = 'polWeek'),
    url(r'^emotions/$', views.emotions,name = 'emotions'),
    url(r'^emotionsMonth/$', views.emotionsMonth,name = 'emotionsMonth'),
    url(r'^sarcasm/$', views.sarcasm,name = 'sarcasm'),
    url(r'^thanks/$', views.thanks,name = 'thanks'),

]