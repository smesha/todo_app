from rest_framework import serializers
from main.models import Task


class TaskSerializer(serializers.ModelSerializer):

    user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())


    class Meta:
        model = Task
        fields = "__all__"
