from django.contrib.auth import login, logout
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import views as auth_views
from .forms import LoginForm, RegisterForm
from django.views.generic import ListView

from .models import Quiz, Question, UserQuiz, Proposition, CustomUser

def index(request):
    return render(request, 'quizApps/index.html')

def register(request):
    if request.user.is_authenticated:
        return redirect('index')
    else:
        if request.method == 'POST':
            form = RegisterForm(request.POST)
            if form.is_valid():
                user = form.save()
                login(request,user)
                return redirect('index')
        else:
            form = RegisterForm()
        return render(request, 'quizApps/register.html', {'form': form})

class LoginView(auth_views.LoginView):
    form_class = LoginForm
    template_name = 'quizApps/login.html'
    redirect_authenticated_user=True

def logout_view(request):
    logout(request)
    return redirect('index')

def create_quiz(request):
    if request.method == 'POST':
        print(request)
        return redirect('index')
    else:
        return render(request, 'quizApps/quiz-creation.html')