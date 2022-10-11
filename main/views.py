from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import SignupForm 
from .models import CustomUser
from django.contrib.auth import login, authenticate
from django.utils.timezone import now



@login_required
def home(request):
    return render(request, 'main/index.html')

def signup(request):
    if request.method == "POST":
        form = SignupForm(request.POST)
        
        if form.is_valid():
            
            user = authenticate(request, username=form.cleaned_data["user_name"], password=form.cleaned_data["password"])
            
            if not user:
                user = CustomUser.objects.create_user(username=form.cleaned_data["user_name"], password=form.cleaned_data["password"])
                login(request, user)
                return redirect("main:tasks")
            else:
                return redirect("main:login")
            
    else:
        form = SignupForm()
    
    
    return render(request, 'registration/signup.html', {'form': form})