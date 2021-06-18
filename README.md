# QuizBiblio application

A quiz app to improve knowledge on Literature and Cinema

Made with Django and TailwindCSS

## Installation

Npm est nécessaire.

Exécuter les commandes suivantes (pour windows) :
- `git clone https://github.com/FabienH27/quizBiblio.git`
- `cd quizBiblio`
- `python -m venv venv`
- `. .\venv\Scripts\activate`
- `pip install -r requirements.txt`
- `cd quizBiblio`
- Renommer le fichier `.env.example` en `.env`
- Générer une nouvelle clé avec : `python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'` 
- Copier cette clé dans la variable SECRET_KEY dans le fichier `.env`
- `python manage.py migrate` 
- `python manage.py runserver`