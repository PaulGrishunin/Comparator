# Generated by Django 3.1.7 on 2021-04-15 18:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ads', '0005_auto_20210415_1553'),
    ]

    operations = [
        migrations.AlterField(
            model_name='brands',
            name='name',
            field=models.CharField(max_length=20),
        ),
    ]
