from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model

from rest_framework import serializers

from .models import Quiz, Theme, UserQuiz
from .models import Proposition, Question

User = get_user_model()

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class ThemeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Theme
        fields = ['url','name']

class QuizSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Quiz
        fields = ['url', 'title','description','theme1','theme2','image','user']

class UserQuizSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserQuiz
        fields = ['url','score','time','is_creator','user','quiz']

class QuestionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Question
        fields = ['url','question','image', 'explication','quiz']

class PropositionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Proposition
        fields = ['url','propositionText','image','question','is_correct']