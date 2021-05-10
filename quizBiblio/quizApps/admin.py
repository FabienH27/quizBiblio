from django.contrib import admin
from .models import CustomUser, Quiz, UserQuiz, Question, Proposition

# Register your models here.

admin.site.register(CustomUser)
admin.site.register(Quiz)
admin.site.register(UserQuiz)
admin.site.register(Question)
admin.site.register(Proposition)