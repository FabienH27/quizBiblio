# Generated by Django 3.2.1 on 2021-07-02 13:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quizApps', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userquiz',
            name='score',
            field=models.IntegerField(default=0, verbose_name='score'),
        ),
        migrations.AlterField(
            model_name='userquiz',
            name='time',
            field=models.IntegerField(default=0, verbose_name='time'),
        ),
    ]
