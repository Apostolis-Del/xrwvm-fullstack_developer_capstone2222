from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class CarMake(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    country = models.CharField(max_length=50, blank=True, null=True)
    founded_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.name


class CarModel(models.Model):
    CAR_TYPES = [
        ('SEDAN', 'Sedan'),
        ('SUV', 'SUV'),
        ('WAGON', 'Wagon'),
        ('COUPE', 'Coupe'),
        ('CONVERTIBLE', 'Convertible'),
        ('HATCHBACK', 'Hatchback'),
        ('VAN', 'Van'),
        ('TRUCK', 'Truck'),
    ]

    car_make = models.ForeignKey(CarMake, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=11, choices=CAR_TYPES, default='SUV')
    year = models.IntegerField(default=2023, validators=[
        MaxValueValidator(2023),
        MinValueValidator(2015)
    ])
    color = models.CharField(max_length=30, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return self.name
