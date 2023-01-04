# Generated by Django 3.2.1 on 2021-10-08 17:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('quizApps', '0004_auto_20210705_2036'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quiz',
            name='theme1',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='first_theme', to='quizApps.theme', verbose_name='1er thème'),
        ),
        migrations.AlterField(
            model_name='quiz',
            name='theme2',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='second_theme', to='quizApps.theme', verbose_name='2nd thème (Facultatif)'),
        ),
    ]