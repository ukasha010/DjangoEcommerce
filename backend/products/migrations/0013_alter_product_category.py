# Generated by Django 5.0 on 2023-12-11 12:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0012_alter_inventory_unique_together_addtocart_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.CharField(choices=[('clothing', 'Clothing'), ('electronics', 'Electronics'), ('books', 'Books')], max_length=20),
        ),
    ]
