import sys,os 
from pathlib import Path
import json

def hello(name:str='World'):
    print(f'Hello, {name}!')
    unused_var = 42

if __name__=='__main__':
    hello()

