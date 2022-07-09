from pickletools import read_long1
from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model

from rest_framework import serializers

from .models import Quiz, Theme, UserQuiz
from .models import Proposition, Question

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'groups']

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['name']

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['title','description','first_theme', 'second_theme']
        

class ThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theme
        fields = ['name']

class UserQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserQuiz
        fields = ['score','time','is_creator','user','quiz']

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['question','image', 'explication','quiz']

class PropositionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Proposition
        fields = ['propositionText','image','question','is_correct']