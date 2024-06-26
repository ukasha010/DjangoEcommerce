# Generated by Django 5.0.1 on 2024-02-08 16:51

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0020_addtocart_inventory'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='addtocart',
            unique_together={('user', 'product', 'inventory')},
        ),
    ]
