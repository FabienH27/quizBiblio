from django.contrib.auth import login, logout
from django.shortcuts import render, redirect
from django.contrib.auth import views as auth_views
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.db.models import Q, Sum
import random
from django.template.loader import render_to_string

from .models import CustomUser, Quiz, Question, UserQuiz, Proposition, Theme
from .forms import LoginForm, RegisterForm


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


def rankings(request):
    themes = Theme.objects.all()
    return render(request, 'quizApps/classement.html', {"themes": themes})


def rankings_response(request):
    theme_id = request.GET.get('id')
    theme = Theme.objects.get(id=theme_id)
    quizzes_by_theme = Quiz.objects.filter(
        Q(theme1=theme)).values_list('id', flat=True)

    users = UserQuiz.objects.filter(quiz__in=quizzes_by_theme)

    result = users.values('utilisateur').annotate(total_score=Sum('score'))
    scores = []
    for res in result:
        res_dict = dict(res)
        user = CustomUser.objects.get(id=int(res_dict['utilisateur']))
        scores.append({'username': user.username ,'score' : res_dict['total_score']})

    html = render_to_string('quizApps/classement_table.html', {'users': scores})

    return HttpResponse(html)


def contact_response(request):
    return render(request, 'quizApps/contact.html.')