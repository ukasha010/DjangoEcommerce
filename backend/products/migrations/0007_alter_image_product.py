# Generated by Django 5.0 on 2023-12-07 17:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0006_remove_product_images_image_product_alter_image_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='products.product'),
        ),
    ]
