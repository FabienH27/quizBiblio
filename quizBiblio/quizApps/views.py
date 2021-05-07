from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect

from .forms import RegisterForm

def index(request):
    return render(request, 'quizApps/index.html')

def login(request):
    return render(request, 'quizApps/login.html')

def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data['username']
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username, password=raw_password)
            login(user)
            return redirect('index')
    else:
        form = RegisterForm()

    return render(request, 'quizApps/register.html', {'form': form})