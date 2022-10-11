from django.urls import path, include, reverse_lazy
from .views import home, signup
from django.contrib.auth import views

app_name = "main"

urlpatterns = [
    path('', home, name="tasks"),
    path('accounts/login/', views.LoginView.as_view(), name="login"),
    path('accounts/signup/', signup, name="signup"),
    path('accounts/logout/', views.LogoutView.as_view(), name="logout"),
    path('accounts/password_change/', views.PasswordChangeView.as_view(success_url=reverse_lazy("main:password_change_done")), name="password_change"),
    path('accounts/password_change/done/', views.PasswordChangeDoneView.as_view(), name="password_change_done")
]
