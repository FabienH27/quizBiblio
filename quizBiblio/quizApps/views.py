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
def play_quiz(request, quiz_id):
    quiz = Quiz.objects.get(id=quiz_id)
    questions = Question.objects.filter(quiz=quiz)
    userquiz = UserQuiz.objects.get(quiz=quiz, utilisateur=request.user)
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
            choicesDict.update({"question"+(str(i+1)): choices_int})

            validChoices = Proposition.objects.values_list(
                'pk', flat=True).filter(is_correct=1, question_id=questions[i].id)

            validDict.update({"question"+(str(i+1)): list(validChoices)})

            for valid in validChoices:
                validList.append(valid)

        for (k, v), (k2, v2) in zip(choicesDict.items(), validDict.items()):
            if(v == v2):
                score += 10

        userquiz.score = score
        userquiz.save()
        request.session['validList'] = validList
        request.session['choices'] = choicesList
        request.session['choicesDict'] = choicesDict
        request.session['validDict'] = validDict
        request.session['score'] = score
        request.session['nbQuestion'] = len(questionsDict)
        return HttpResponseRedirect(request.path)
    else:
        validList = request.session.get('validList', False)
        choicesList = request.session.get('choices', False)
        choicesDict = request.session.get('choicesDict', False)
        validDict = request.session.get('validDict', False)
        score = request.session.get('score', False)
        nbQuestion = request.session.get('nbQuestion', False)

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

    return render(request, 'quizApps/play-quiz.html', {"quiz": quiz,
                                                       "userquiz": userquiz, "propositions": props,
                                                       "questions": questionsDict, "validList": validList, "choices": choicesList,
                                                       "nbQuestion": len(questionsDict), "score": score, "choicesDict": choicesDict, "validDict": validDict
                                                       })


def contact_view(request):

    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            subject = form.cleaned_data['subject']
            message = form.cleaned_data['message']
            sender = form.cleaned_data['sender']
            cc_myself = form.cleaned_data['cc_myself']

            recipients = ['info@example.com']
            if cc_myself:
                recipients.append(sender)

            send_mail(subject, message, sender, recipients)
            return HttpResponseRedirect('/thanks/')
    else:
        form = ContactForm
    return render(request, 'quizApps/contact.html', {"form": form})