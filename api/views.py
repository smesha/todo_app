from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone


from . import serializers
from main.models import Task


class TasksGetPost(generics.ListCreateAPIView):
    serializer_class = serializers.TaskSerializer
    permissions_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id
        last_day = timezone.now() - timezone.timedelta(days=1)
        
        return Task.objects.filter(user_id=user_id, create_date__gte=last_day)
