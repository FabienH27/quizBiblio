from django.contrib import admin
import nested_admin
from .models import Quiz, Theme, Question, Proposition, UserQuiz, CustomUser
from django import forms
from .forms import QuestionForm
from django.utils.safestring import mark_safe
from django.urls import reverse

admin.site.site_header = 'QuizBiblio'  # default: "Django Administration"
# default: "Site administration"
admin.site.index_title = 'QuizBiblio Administration'
admin.site.site_title = 'Quizbiblio site admin'  # default: "Django site admin"

admin.site.register(CustomUser)


class UserQuizInline(nested_admin.NestedStackedInline):
    model = UserQuiz
    extra = 1
    exclude = ['score', 'time', 'is_creator']
    max_num = 1


class PropositionInline(nested_admin.NestedStackedInline):
    model = Proposition
    initial_num = 2
    max_num = 4
    extra = 0
    template = "quizApps/stacked.html"


class QuestionInline(nested_admin.NestedStackedInline):
    model = Question
    initial_num = 1
    extra = 1
    max_num = 15
    inlines = [PropositionInline]
    template = "quizApps/stacked.html"


class QuizAdmin(nested_admin.NestedModelAdmin):
    inlines = [UserQuizInline, QuestionInline]

    def save_model(self, request, instance, form, change):
        user = request.user
        instance = form.save()
        if not change or not instance.utilisateur:
            instance.utilisateur.add(user)
        instance.utilisateur.add(user)
        form.save_m2m()
        return instance


admin.site.register(Quiz, QuizAdmin)


class ThemeForm(forms.ModelForm):
    class Meta:
        model = Theme
        exclude = []


admin.site.register(Theme)
