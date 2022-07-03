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

class ThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theme
        fields = ['name']

class QuizSerializer(serializers.ModelSerializer):
    theme1 = serializers.RelatedField(source='Theme', read_only=True)
    class Meta:
        model = Quiz
        fields = ['title','description','theme1','theme2','image','user']

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