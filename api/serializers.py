from rest_framework import serializers
from main.models import Task


class TaskSerializer(serializers.ModelSerializer):

    user = serializers.HiddenField(default=serializers.CurrentUserDefault())


    class Meta:
        model = Task
        fields = ["user", "text", "is_done", "id"]
