from django.core.validators import BaseValidator
from django.core.exceptions import ValidationError


class QuantityValidator(BaseValidator):
    message = 'Quantity cannot be greater than available inventory.'

    def __call__(self, value, instance):
        # Check if the instance is being updated (instance exists and has a primary key)
        if instance and instance.pk:
            # Get the related inventory item
            inventory_quantity = instance.inventory.quantity

            # Compare the quantity in AddToCart with the quantity available in Inventory
            if value > inventory_quantity:
                raise ValidationError(self.message)
        else:
            # This is a new instance, so no need to perform validation
            pass
