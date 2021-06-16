from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import get_user_model
from django import forms
from django.forms import ModelForm

from .models import *

class RegisterForm(UserCreationForm):
    class Meta:
        model = get_user_model()
        fields = ('email', 'username', 'password1', 'password2')
    def clean_email(self):
        email = self.cleaned_data.get('email')
        username = self.cleaned_data.get('username')
        if email and get_user_model().objects.filter(email=email).count() > 0:
            raise forms.ValidationError(u'Cette adresse email existe déjà.')
        return email

class LoginForm(AuthenticationForm):
    username = forms.CharField(label="Email / Nom d'utilisateur")

class QuizForm(forms.ModelForm):
    class Meta:
        model = Quiz
        fields = ['title','description','image']

class PropositionForm(forms.Form):
    class Meta:
        model = Proposition
        fields = ['propositionText','image']

    def clean(self):
        cleaned_data = super().clean()

class QuestionForm(forms.Form):
    class Meta:
        model = Question
        fields = ['questionText','image','description']