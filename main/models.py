from django.db import models
# from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


class CustomUser(AbstractUser):
    last_visit = models.DateField('Последние посещение сайта', default=timezone.now)
    username = models.CharField('имя пользователя', max_length=255, unique=True)

    def __str__(self):
        return self.username


class Task(models.Model):

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    text = models.TextField()
    is_done = models.BooleanField()
    create_date = models.DateField(auto_now_add=True)    

    def __str__(self):
        return self.user.username + " " + self.text