# Generated by Django 4.0 on 2021-04-23 15:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ads', '0011_alter_platform_price_diff'),
    ]

    operations = [
        migrations.AlterField(
            model_name='platform',
            name='date_add',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
