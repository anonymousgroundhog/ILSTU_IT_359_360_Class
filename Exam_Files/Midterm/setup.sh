#!/bin/bash

sudo apt update && sudo apt upgrade -y
sudo apt install -y python3 python3-dev libpython3-dev python3-pip python3-venv git build-essential libdistorm3-dev yara libraw1394-11 libcapstone-dev capstone-tool tzdata

mkdir volatility3_env
cd volatility3_env
python3 -m venv venv
source venv/bin/activate
pip install volatility3
