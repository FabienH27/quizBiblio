from django.contrib.auth import login, logout
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import views as auth_views
from .forms import LoginForm, RegisterForm
from django.views.generic import ListView
from django.contrib.auth.decorators import login_required

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

@login_required
def create_quiz(request):
    if request.method == 'POST':
        test = Quiz(request.POST, request.FILES)

        #quizTitle = request.POST.get('quizTitle')
        #quizDescription = request.POST.get('quizDescription')
        #quizImage = request.FILES.get('quizImage')
        #quizUser = request.user.id
        #nbQuestion = request.POST.get('numberQuestion')
        #quiz, created = Quiz.objects.update_or_create(
        #    title=quizTitle,
        #    description=quizDescription,
        #    theme = "ThemeTest",
        #    image = quizImage,
        #)
        #user = CustomUser.objects.get(id=quizUser)
        #quiz.user.add(user)
        ##looping over questions
        #for i in range(int(nbQuestion)):
        #    question, created = Question.objects.update_or_create(
        #        questionText= request.POST.get("question"+(str(i+1))),
        #        image = request.FILES.get('imageQfile'+(str(i+1))),
        #        description=request.POST.get('explication-q'+(str(i+1))),
        #    )
        #    question.quiz.add(quiz)
        #    propCount = request.POST.get('q'+(str(i+1))+'-propCount')
        #    
        #    #Looping over possible answers
        #    for j in range(int(propCount)):
        #        if request.POST.get("q"+(str(i+1))+"-imageProp"+(str(j+1))) is None:
        #            text = "image"
        #        else:
        #            text = request.POST.get('proposition'+(str(i+1))+'-'+(str(j+1)))
        #        proposition, created = Proposition.objects.update_or_create(
        #            propositionText= text,
        #            image = request.FILES.get("q"+(str(i+1))+"-imageProp"+(str(j+1))), 
        #            question = question
        #        )
        return redirect('index')
    else:
        return render(request, 'quizApps/quiz-creation.html')