from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError


#def validate_title(title):
#    if title is None:
#        raise ValidationError("Veuillez saisir un titre",
#                            params={'title': title})

class CustomUser(AbstractUser):
    email = models.EmailField(
        _('email address'), help_text='Requis. Saisir une adresse email valide.', unique=True)


class Quiz(models.Model):
    title = models.CharField(_('title'), max_length=30)
    description = models.TextField(_('description'), blank=True, null=True)
    theme = models.CharField(_('theme'), max_length=40, default='defaultTheme')
    image = models.ImageField(_('image'), blank=True,
                              null=True, upload_to='./')
    user = models.ManyToManyField(
        CustomUser, through='UserQuiz', related_name='quiz')

    def __str__(self):
        return self.title

class UserQuiz(models.Model):
    score = models.IntegerField(_('score'), blank=True, null=True)
    time = models.DateTimeField(
        _('time'), auto_now_add=False, blank=True, null=True)
    is_creator = models.BooleanField(default=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


class Proposition(models.Model):
    propositionText = models.CharField(_('proposition'), max_length=255)
    image = models.ImageField(upload_to='./', blank=True, null=True)
    question = models.ForeignKey(
        'Question', on_delete=models.CASCADE, related_name='+')
    question = models.ForeignKey('Question', on_delete=models.DO_NOTHING )

    def __str__(self):
        return self.propositionText

class Question(models.Model):
    questionText = models.CharField(_('question'), max_length=255)
    image = models.ImageField(upload_to='./', blank=True, null=True)
    description = models.TextField(_('description'))
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, blank=True, null=True)
    correct = models.ForeignKey('Proposition', on_delete=models.DO_NOTHING, blank=True,null=True, related_name='correct_prop')

    def __str__(self):
        return self.questionText