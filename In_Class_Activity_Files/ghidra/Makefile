# Variables
GHIDRA_VERSION = 11.3.1
GHIDRA_DATE = 20250219
GHIDRA_URL = https://github.com/NationalSecurityAgency/ghidra/releases/download/Ghidra_$(GHIDRA_VERSION)_build/ghidra_$(GHIDRA_VERSION)_PUBLIC_$(GHIDRA_DATE).zip
INSTALL_DIR = /opt/ghidra
BIN_PATH = /usr/local/bin/ghidra

.PHONY: all install dependencies clean help

all: dependencies install

help:
	@echo "Ghidra Installer for Ubuntu"
	@echo "Usage:"
	@echo "  sudo make install      - Install JDK and Ghidra"
	@echo "  sudo make clean        - Remove Ghidra installation"

dependencies:
	@echo "Updating system and installing OpenJDK..."
	apt-get update
	apt-get install -y wget unzip openjdk-21-jdk libvorg-java

install:
	@echo "Downloading Ghidra $(GHIDRA_VERSION)..."
	wget -q --show-progress $(GHIDRA_URL) -O /tmp/ghidra.zip
	
	@echo "Extracting to $(INSTALL_DIR)..."
	mkdir -p $(INSTALL_DIR)
	unzip -q /tmp/ghidra.zip -d /tmp/ghidra_extracted
	# Move contents of the extracted folder to /opt/ghidra
	mv /tmp/ghidra_extracted/*/* $(INSTALL_DIR)
	
	@echo "Setting up launcher..."
	ln -sf $(INSTALL_DIR)/ghidraRun $(BIN_PATH)
	chmod +x $(INSTALL_DIR)/ghidraRun
	
	@echo "Cleaning up temp files..."
	rm -rf /tmp/ghidra.zip /tmp/ghidra_extracted
	@echo "----------------------------------------------------"
	@echo "Installation complete! Run 'ghidra' to start."

clean:
	@echo "Removing Ghidra..."
	rm -rf $(INSTALL_DIR)
	rm -f $(BIN_PATH)
	@echo "Ghidra removed."
