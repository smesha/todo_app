from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    is_done = models.BooleanField()
    create_date = models.DateField(auto_now_add=True)    
