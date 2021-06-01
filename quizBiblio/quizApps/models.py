from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class CustomUser(AbstractUser):
    email = models.EmailField(_('email address'), help_text='Requis. Saisir une adresse email valide.', unique=True)

class Quiz(models.Model):
    title = models.CharField(_('title'), max_length=30)
    description = models.TextField(_('description'), blank=True, null=True)
    theme = models.CharField(_('theme'), max_length=255)
    image = models.ImageField(_('image'), blank=True, null=True, upload_to='uploads/')
    user = models.ManyToManyField(CustomUser, through='UserQuiz', related_name='quiz')

class UserQuiz(models.Model):
    score = models.IntegerField(_('score'), blank=True, null=True)
    time = models.DateTimeField(_('time'), auto_now_add=False,blank=True, null=True)
    is_creator = models.BooleanField(default=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)

class Proposition(models.Model):
    propositionText = models.CharField(_('proposition'), max_length=255)
    image = models.ImageField(upload_to='uploads/',blank=True, null=True)
    question = models.ForeignKey('Question', on_delete=models.CASCADE,related_name='+')

class Question(models.Model):
    questionText = models.CharField(_('question'), max_length=255)
    image = models.ImageField(upload_to='uploads/', blank=True, null=True)
    description = models.TextField(_('description'))
    quiz = models.ManyToManyField(Quiz)