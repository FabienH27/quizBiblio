from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model

from rest_framework import viewsets
from rest_framework import permissions

from .models import Question, Quiz, Theme, UserQuiz, Proposition
from .serializers import PropositionSerializer, QuestionSerializer, QuizSerializer, ThemeSerializer, UserQuizSerializer, UserSerializer, GroupSerializer

User = get_user_model()

# class UserViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows users to be viewed or edited.
#     """
#     queryset = User.objects.all().order_by('-date_joined')
#     serializer_class = UserSerializer
#     permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all().order_by('name')
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

class ThemeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows themes to be viewed or edited.
    """
    queryset = Theme.objects.all()
    serializer_class = ThemeSerializer
    permission_classes = [permissions.IsAuthenticated]

class QuizViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows quizzes to be viewed or edited.
    """
    queryset = Quiz.objects.all().order_by('title')
    serializer_class = QuizSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserQuizViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows user quizzes to be viewed or edited.
    """
    queryset = UserQuiz.objects.all().order_by('score')
    serializer_class = UserQuizSerializer
    permission_classes = [permissions.IsAuthenticated]

class QuestionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows questions to be viewed or edited.
    """
    queryset = Question.objects.all().order_by('question')
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticated]

class PropositionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows propositions to be viewed or edited.
    """
    queryset = Proposition.objects.all().order_by('question')
    serializer_class = PropositionSerializer
    permission_classes = [permissions.IsAuthenticated]