# Generated by Django 5.0.1 on 2024-02-07 17:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0017_addtocart_inventory_alter_inventory_color_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='addtocart',
            name='inventory',
        ),
    ]
