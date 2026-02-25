# example.py
from typing import Iterable
import os
import sys

def sum_even_numbers(numbers: Iterable[int]) -> int:
    """Given an iterable of integers, return the sum of all even numbers."""
    return sum(
        num for num in numbers
        if num % 2 == 0
    )
unused_var = 42
