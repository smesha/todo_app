from django.contrib import admin
from .models import Task
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['username', 'password', 'last_visit']
    fieldsets = (
        (None, {
            'fields': ('username', 'password', 'last_visit',),
        }),
    )


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Task)
