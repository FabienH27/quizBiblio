from django.contrib.auth import login, logout
from django.shortcuts import get_object_or_404, render, redirect, reverse
from django.contrib.auth import views as auth_views
from django.views.generic import ListView
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect

import random
import json

from .models import Quiz, Question, UserQuiz, Proposition, CustomUser
from .forms import QuizForm, PropositionForm, QuestionForm, LoginForm, RegisterForm


def index(request):
    quizzes = Quiz.objects.all()
    #questions = Question.objects.all()
    #userquizzes = UserQuiz.objects.all()
    #questionsDict = {}
    #for quiz in quizzes:
    #    questionsDict.update({quiz: questions.filter(quiz=quiz).count()})

    return render(request, 'quizApps/index.html', {"quizzes": quizzes})


def register(request):
    if request.user.is_authenticated:
        return redirect('index')
    else:
        if request.method == 'POST':
            form = RegisterForm(request.POST)
            if form.is_valid():
                user = form.save()
                login(request, user)
                return redirect('index')
        else:
            form = RegisterForm()
        return render(request, 'quizApps/register.html', {'form': form})


class LoginView(auth_views.LoginView):
    form_class = LoginForm
    template_name = 'quizApps/login.html'
    redirect_authenticated_user = True


def logout_view(request):
    logout(request)
    return redirect('index')


@login_required
def create_quiz(request):
    if request.method == 'POST':
        quiz = QuizForm(request.POST, request.FILES)

        question = QuestionForm(request.POST, request.FILES)
        print(question)
        return render(request, 'quizApps/quiz-creation.html', {'quiz': quiz, 'question': question})

        #quizTitle = request.POST.get('quizTitle')
        #quizDescription = request.POST.get('quizDescription')
        #quizImage = request.FILES.get('quizImage')
        #quizUser = request.user.id
        #nbQuestion = request.POST.get('numberQuestion')
        # quiz, created = Quiz.objects.update_or_create(
        #    title=quizTitle,
        #    description=quizDescription,
        #    theme = "ThemeTest",
        #    image = quizImage,
        # )
        #user = CustomUser.objects.get(id=quizUser)
        # quiz.user.add(user)
        # looping over questions
        # for i in range(int(nbQuestion)):
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
    else:
        quiz = QuizForm()
        return render(request, 'quizApps/quiz-creation.html', {'form': quiz})


@login_required
def play_quiz(request, quiz_id):
    quiz = Quiz.objects.get(id=quiz_id)
    questions = Question.objects.filter(quiz=quiz)
    userquiz = UserQuiz.objects.get(quiz=quiz, user=request.user)
    props = Proposition.objects.filter(question__in=questions)

    questionsDict = {}
    for question in questions:
        questionsDict.update({question: props.filter(question=question)})

    # RANDOMIZE QUESTIONS
    questionList = list(questionsDict.items())
    random.shuffle(questionList)
    questionsDict = dict(questionList)

    if request.method == 'POST':
        validList = []
        choices = []
        score = userquiz.score
        for i in range(len(questions)):
            choice = request.POST.get("question-"+(str(i+1)))
            choices.append(choice)
            validChoice = Question.objects.values_list(
                'correct_id', flat=True).get(id=questions[i].id)
            validList.append(validChoice)
            if int(choice) == int(validChoice):
                score += 10

        userquiz.score = score
        userquiz.save()
        request.session['validList'] = validList
        request.session['choices'] = choices
        request.session['score'] = score
        request.session['nbQuestion'] = len(questionsDict)
        return HttpResponseRedirect(request.path)
    else:
        validList = request.session.get('validList', False)
        choices = request.session.get('choices', False)
        score = request.session.get('score', False)
        nbQuestion = request.session.get('nbQuestion', False)

        if(validList):
            del(request.session['validList'])
        if(choices):
            del(request.session['choices'])
        if(score):
            del(request.session['score'])
        if(nbQuestion):
            del(request.session['nbQuestion'])

    return render(request, 'quizApps/play-quiz.html', {"quiz": quiz,
                                                       "userquiz": userquiz, "propositions": props,
                                                       "questions": questionsDict, "validList": validList, "choices": choices, "nbQuestion": len(questionsDict), "score": score
                                                       })