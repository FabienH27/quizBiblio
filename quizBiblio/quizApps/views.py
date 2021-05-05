from django.shortcuts import render

def index(request):
    return render(request, 'quizApps/index.html')

def login(request):
    return render(request, 'quizApps/login.html')

def register(request):
    return render(request, 'quizApps/register.html')