from django.urls import path, include
from . import views

app_name = "main"

urlpatterns = [
    path('', views.home, name="tasks"),
    path('accounts/', include('django.contrib.auth.urls')),
]
