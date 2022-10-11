from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from rest_framework import pagination


from . import serializers
from main.models import Task, CustomUser


class TasksList(generics.ListCreateAPIView):
    serializer_class = serializers.TaskSerializer
    permissions_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id
        last_day = timezone.now() - timezone.timedelta(days=1)
        
        return Task.objects.filter(user_id=user_id, create_date__gte=last_day)

class TasksUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.TaskSerializer
    permissions_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id
        last_day = timezone.now() - timezone.timedelta(days=1)
                
        return Task.objects.filter(user_id=user_id, create_date__gte=last_day)

class Notice(APIView):
    def get(self, request):
        current_day = timezone.now().date()
        user_id = self.request.user.id
        last_day = current_day - timezone.timedelta(days=1)

        if request.user.last_visit < current_day:
            CustomUser.objects.filter(id=user_id).update(last_visit=current_day)

            last_tasks = Task.objects.filter(user_id=user_id, create_date__lt=current_day, create_date__gte=last_day)
            checked_tasks = last_tasks.filter(is_done=True)

            message =  f"Вчерашних заданий было выполнено  {len(checked_tasks)} из {len(last_tasks)}"

            return Response({"mesSended": True, "mes": message})
        return Response({"mesSended": False, "mes": ''})
