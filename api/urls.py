from django.urls import path
from . import views


app_name = "api"

urlpatterns = [
    path("tasks/", views.TasksList.as_view()),
    path("tasks/<int:pk>/", views.TasksUpdateDelete.as_view()),
    path("notice/", views.Notice.as_view()),
]
