# Generated by Django 5.0 on 2023-12-12 14:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0014_product_on_sale_product_sale_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='img',
            field=models.ImageField(default=None, upload_to='product_images'),
        ),
    ]
