from django.core.exceptions import ValidationError

__all__ = [
    'positive',
    'nonzero',
    'max_100',
]


def max_100(value):
    if value > 100:
        raise ValidationError('Value must be less than or equal to 100')


def positive(value):
    if value < 0:
        raise ValidationError('Value cannot be negative')


def nonzero(value):
    if value == 0:
        raise ValidationError('Value cannot be zero')
