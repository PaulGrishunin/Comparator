# Generated by Django 4.0 on 2021-06-09 14:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ads', '0015_alter_platform_model_alter_platform_photo_link'),
    ]

    operations = [
        migrations.AlterField(
            model_name='platform',
            name='photo_link',
            field=models.URLField(max_length=300, null=True),
        ),
    ]
