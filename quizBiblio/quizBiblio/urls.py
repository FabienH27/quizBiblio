"""quizBiblio URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('', views.index, name='index'),
#     path('login/', LoginView.as_view(), name='login'),
#     path('register/', views.register, name='register'),
#     path("logout/", views.logout_view, name="logout"),
#     path('play-quiz/<int:quiz_id>', views.play_quiz, name='play-quiz'),
#     path('classement', views.rankings, name='classement'),
#     path('rankings-response', views.rankings_response, name='rankings-response'),
#     path('contact', views.contact_response, name="contact"),
# ]

# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from quizApps.views import QuizViewSet, ThemeViewSet, UserQuizViewSet, GroupViewSet
from quizApps.views import PropositionViewSet, QuestionViewSet

router = routers.DefaultRouter()
# router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'themes', ThemeViewSet)
router.register(r'quizzes', QuizViewSet)
router.register(r'userquizzes', UserQuizViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'propositions',PropositionViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include(router.urls)),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/', include(('auth_quizBiblio.routers', 'auth_quizBiblio'), namespace='auth-api')),
]
