# Generated by Django 5.0 on 2023-12-07 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='categories',
        ),
        migrations.AddField(
            model_name='product',
            name='category',
            field=models.CharField(default=None, max_length=20),
        ),
        migrations.DeleteModel(
            name='Category',
        ),
    ]
