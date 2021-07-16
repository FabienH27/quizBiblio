from django.contrib.auth import login, logout
from django.shortcuts import get_object_or_404, render, redirect, reverse
from django.contrib.auth import views as auth_views
from django.views.generic import ListView
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.core.exceptions import ValidationError

import random
import json

from .models import Quiz, Question, UserQuiz, Proposition, CustomUser
from .forms import QuizForm, PropositionForm, QuestionForm, LoginForm, RegisterForm, ContactForm
from django.core.mail import send_mail


def index(request):
    quizzes = Quiz.objects.all()
    quizInfos = UserQuiz.objects.filter(quiz=quizzes)
    activeUser = None
    activeUserInfos = {}
    if request.user.is_authenticated:
        try:
            activeUser = UserQuiz.objects.filter(
                utilisateur=request.user).values_list('score', 'time')
        except UserQuiz.DoesNotExist:
            activeUser = None
    return render(request, 'quizApps/index.html', {"quizzes": quizzes, "activeUser": activeUserInfos, "quizInfos": quizInfos})


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
def play_quiz(request, quiz_id):
    quiz = Quiz.objects.get(id=quiz_id)
    questions = Question.objects.filter(quiz=quiz)
    userquiz, created = UserQuiz.objects.get_or_create(
        quiz=quiz, utilisateur=request.user)
    props = Proposition.objects.filter(question__in=questions)
    rightAnswers = 0
    questionsDict = {}
    for question in questions:
        questionsDict.update({question: props.filter(question=question)})

    # RANDOMIZE QUESTIONS
    questionList = list(questionsDict.items())
    random.shuffle(questionList)
    questionsDict = dict(questionList)

    if request.method == 'POST':
        userquiz, created = UserQuiz.objects.get_or_create(
            quiz=quiz, utilisateur=request.user)
        validList = []
        choicesList = []
        choicesDict = {}
        validDict = {}
        messages = []
        score = userquiz.score
        for i in range(len(questions)):
            choices = request.POST.getlist("question-"+str(questions[i].id))
            for choice in choices:
                choicesList.append(choice)

            choices_int = [int(i) for i in choices]
            choicesDict.update({"question"+str(questions[i].id): choices_int})

            validChoices = Proposition.objects.values_list(
                'pk', flat=True).filter(is_correct=1, question_id=questions[i].id)

            validDict.update(
                {"question"+str(questions[i].id): list(validChoices)})

            for valid in validChoices:
                validList.append(valid)

        for (k, v), (k2, v2) in zip(choicesDict.items(), validDict.items()):
            if(v == v2):
                score += 10
                rightAnswers += 1

        userquiz.score = score
        userquiz.time = request.POST.get("time")
        userquiz.is_creator = False
        userquiz.save()
        request.session['validList'] = validList
        request.session['choices'] = choicesList
        request.session['choicesDict'] = choicesDict
        request.session['validDict'] = validDict
        request.session['score'] = score
        request.session['nbQuestion'] = len(questionsDict)
        request.session['rightAnswers'] = rightAnswers
        return HttpResponseRedirect(request.path)
    else:
        validList = request.session.get('validList', False)
        choicesList = request.session.get('choices', False)
        choicesDict = request.session.get('choicesDict', False)
        validDict = request.session.get('validDict', False)
        score = request.session.get('score', False)
        nbQuestion = request.session.get('nbQuestion', False)
        rightAnswers = request.session.get('rightAnswers', False)

        if(validList):
            del(request.session['validList'])
        if(choicesList):
            del(request.session['choices'])
        if(choicesDict):
            del(request.session['choicesDict'])
        if(validDict):
            del(request.session['validDict'])
        if(score):
            del(request.session['score'])
        if(nbQuestion):
            del(request.session['nbQuestion'])
        if(rightAnswers):
            del(request.session['rightAnswers'])

    return render(request, 'quizApps/play-quiz.html', {"quiz": quiz,
                                                       "userquiz": userquiz, "propositions": props,
                                                       "questions": questionsDict, "validList": validList, "choices": choicesList,
                                                       "nbQuestion": len(questionsDict), "score": score, 
                                                       "choicesDict": choicesDict, "validDict": validDict, "rightAnswers": rightAnswers
                                                       })

#def contact_view(request):
#
#    if request.method == 'POST':
#        form = ContactForm(request.POST)
#        if form.is_valid():
#            subject = form.cleaned_data['subject']
#            message = form.cleaned_data['message']
#            sender = form.cleaned_data['sender']
#            cc_myself = form.cleaned_data['cc_myself']
#
#            recipients = ['info@example.com']
#            if cc_myself:
#                recipients.append(sender)
#
#            send_mail(subject, message, sender, recipients)
#            return HttpResponseRedirect('/thanks/')
#    else:
#        form = ContactForm
#    return render(request, 'quizApps/contact.html', {"form": form})

def rankings(request):
    return render(request, 'quizApps/classement.html')