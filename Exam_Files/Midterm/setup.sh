#!/bin/bash

git clone https://github.com/volatilityfoundation/volatility3.git
cd volatility3/
sudo apt install python3
sudo apt install python3-pip
sudo apt update --fix-missing
sudo apt install python3.12-venv
python3 -m venv venv && . venv/bin/activate
pip install -e ".[dev]"
cd volatility3/symbols
wget https://downloads.volatilityfoundation.org/volatility3/symbols/windows.zip
unzip windows.zip
wget https://downloads.volatilityfoundation.org/volatility3/symbols/linux.zip
unzip linux.zip
cd ../
