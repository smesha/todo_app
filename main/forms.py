from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser


class SignupForm(forms.Form):
    user_name = forms.CharField(label='Имя пользователя', max_length=100)
    password = forms.CharField(label='Пароль', widget=forms.PasswordInput())
    password_again = forms.CharField(label='Пароль', widget=forms.PasswordInput())
    
    def clean(self):
        cleaned_data = super(SignupForm, self).clean()
        password = cleaned_data.get("password")
        password_again = cleaned_data.get("password_again")
    
        if password != password_again:
            raise forms.ValidationError(
                "Пароли не совпадают"
            )


class CustomUserCreationForm(UserCreationForm):

    class Meta:
        model = CustomUser
        fields = ['username', 'password']

class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = CustomUser
        fields = ['username', 'password']
