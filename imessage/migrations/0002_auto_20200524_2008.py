# Generated by Django 3.0.1 on 2020-05-24 20:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('imessage', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='texts',
            name='text',
            field=models.CharField(max_length=50),
        ),
    ]
