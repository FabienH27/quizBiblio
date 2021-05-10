from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import render, redirect
from django.contrib.auth import views as auth_views
from django.urls import reverse_lazy

from .forms import LoginForm, RegisterForm

def index(request):
    return render(request, 'quizApps/index.html')

#def login(request):
#    return render(request, 'quizApps/login.html')
#
#def register(request):
#    if request.method == 'POST':
#        form = RegisterForm(request.POST)
#        if form.is_valid():
#            form.save()
#            email = form.cleaned_data['email']
#            raw_password = form.cleaned_data.get('password1')
#            user = authenticate(email, password=raw_password)
#            login(user)
#            return redirect('index')
#    else:
#        form = RegisterForm()
#    return render(request, 'quizApps/register.html', {'form': form})

#class LoginView(auth_views.LoginView):
#    form_class = LoginForm
#    template_name = 'quizApps/login.html'
#    success_url = reverse_lazy('index')

def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            email = form.cleaned_data['email']
            raw_password = form.cleaned_data.get('password1')
            print(email)
            user = authenticate(email, password=raw_password)
            login(user)
            return redirect('index')
    else:
        form = RegisterForm()
    return render(request, 'quizApps/register.html', {'form': form})

def login(request):
    if request.method == 'POST':  
        form = LoginForm(request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('index')
    else:
        form = LoginForm()
    return render(request, 'quizApps/login.html', {'form': form})

class LoginView(auth_views.LoginView):
    form_class = LoginForm
    template_name = 'quizApps/login.html'

def logout_view(request):
    logout(request)
    return redirect('index')