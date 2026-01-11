from django.urls import path
from .views import register, login, trip_list_create

urlpatterns = [
    path('register/', register),
    path('login/', login),
    path('trip/', trip_list_create),
]
