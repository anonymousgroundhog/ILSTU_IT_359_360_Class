# Before installing anything run the following

```shell
sudo apt update
```

# Install Ghidra

```shell
sudo snap install ghidra
```

# Install APKTool

```shell
sudo apt install apktool
```

# Install pev and IlSpyCmd

```shell
sudo apt install pev
sudo apt install -y dotnet-sdk-8.0
dotnet tool install -g IlSpyCmd
```

After installing IlSpyCmd

```shell
cat << \EOF >> ~/.bash_profile
# Add .NET Core SDK tools
export PATH="$PATH:/home/vmuser/.dotnet/tools"
EOF

source ~/.bash_profile
```

# Setup PyxamStore

```shell
sudo apt install python3-pip

sudo apt install python3-lz4
sudo apt install python3-xxhash

sudo apt install git
git clone https://github.com/jakev/pyxamstore.git
```

```shell
cd pyxamstore
# Install the venv module if you don't have it
sudo apt update && sudo apt install python3-venv

# Create and activate the environment
python3 -m venv venv
source venv/bin/activate

# Install the package
pip install .
```

# APKPure

Download a apk file from: [Link](https://apkpure.com/)
