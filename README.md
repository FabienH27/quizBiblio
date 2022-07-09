# **⚠️Migrating to Django Rest Framework ⚠️**

A quiz app to improve knowledge on Literature and Cinema

Server-side version of the app

Live preview : https://quizbiblio.herokuapp.com/

Made with Django, MySQL & TailwindCSS.

## Installation

MySQL is required.

Run the following commands (for windows) :
```bash
$ git clone https://github.com/FabienH27/quizBiblio.git
$ cd quizBiblio
$ python -m venv venv
$ . .\venv\Scripts\activate
$ pip install -r requirements.txt
$ cd quizBiblio
``` 
- Rename file `.env.example` to `.env`
- Generate a new key : `python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'` 
- Copy this new key to the SECRET_KEY var in the `.env` file.
- Add your database credentials to this file.
```python
$ python manage.py migrate
$ python manage.py runserver
```