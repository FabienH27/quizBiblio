from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _

from rest_framework import serializers

# Create your models here.
class Theme(models.Model):
    name = models.CharField(max_length=40)

    def __str__(self):
        return self.name

class Quiz(models.Model):
    title = models.CharField(_('titre'), max_length=60, unique=True, error_messages={
                             'unique': 'Ce titre est déjà utilisé.'})
    description = models.TextField(_('description'), blank=True, null=True)
    theme1 = models.ForeignKey(Theme,verbose_name='1er thème', on_delete=models.CASCADE, related_name="first_theme")
    theme2 = models.ForeignKey(Theme,verbose_name='2nd thème (Facultatif)', on_delete=models.CASCADE, blank=True, null=True, related_name="second_theme")
    image = models.ImageField(_('image'), blank=True,
                              null=True, upload_to='uploads/')
    user = models.ManyToManyField(
        settings.AUTH_USER_MODEL , through='UserQuiz', related_name='quiz', blank=False)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        print(self)

        if(self.theme2 == self.theme1):
            raise serializers.ValidationError("Themes cannot be the same")
        return super().save(*args, **kwargs)


class UserQuiz(models.Model):
    score = models.IntegerField(_('score'), default=0)
    time = models.IntegerField(_('time'), default=0)
    is_creator = models.BooleanField(default=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, editable=False)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    def __str__(self):
        return self.utilisateur.username


class Proposition(models.Model):
    propositionText = models.CharField(_('proposition'), max_length=255)
    image = models.ImageField(upload_to='uploads/', blank=True, null=True)
    question = models.ForeignKey(
        'Question', on_delete=models.CASCADE, related_name='+')
    is_correct = models.BooleanField(("Est correcte"), default=False)

    def __str__(self):
        return self.propositionText


class Question(models.Model):
    question = models.CharField(_('question'), max_length=255)
    image = models.ImageField(upload_to='uploads/', blank=True, null=True)
    explication = models.TextField(_('Explication'), blank=True, null=True)
    quiz = models.ForeignKey(
        Quiz, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.question