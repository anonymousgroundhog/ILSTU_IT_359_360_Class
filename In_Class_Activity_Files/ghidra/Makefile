# Variables
GHIDRA_VERSION = 11.3.1
GHIDRA_DATE = 20250219
GHIDRA_URL = https://github.com/NationalSecurityAgency/ghidra/releases/download/Ghidra_$(GHIDRA_VERSION)_build/ghidra_$(GHIDRA_VERSION)_PUBLIC_$(GHIDRA_DATE).zip
INSTALL_DIR = /opt/ghidra
BIN_PATH = /usr/local/bin/ghidra

.PHONY: all install dependencies clean help check-root

all: check-root dependencies install

help:
	@echo "Ghidra Installer for Ubuntu"
	@echo "Usage:"
	@echo "  sudo make         - Install everything"
	@echo "  sudo make clean   - Remove Ghidra installation"

check-root:
	@if [ "$$(id -u)" -ne 0 ]; then \
		echo "Error: This Makefile must be run as root (use sudo)."; \
		exit 1; \
	fi

dependencies:
	@echo "Updating system and installing OpenJDK 21..."
	apt-get update
	apt-get install -y wget unzip openjdk-21-jdk

install:
	@echo "Downloading Ghidra $(GHIDRA_VERSION)..."
	wget -q --show-progress $(GHIDRA_URL) -O /tmp/ghidra.zip
	
	@echo "Extracting to $(INSTALL_DIR)..."
	mkdir -p $(INSTALL_DIR)
	# Extracting to a temp folder first to handle the nested directory structure inside the zip
	rm -rf /tmp/ghidra_extracted
	mkdir -p /tmp/ghidra_extracted
	unzip -q /tmp/ghidra.zip -d /tmp/ghidra_extracted
	
	@echo "Moving files to $(INSTALL_DIR)..."
	# The zip contains a folder like 'ghidra_11.3.1_PUBLIC', this moves its contents
	cp -r /tmp/ghidra_extracted/*/* $(INSTALL_DIR)
	
	@echo "Setting up launcher..."
	ln -sf $(INSTALL_DIR)/ghidraRun $(BIN_PATH)
	chmod +x $(INSTALL_DIR)/ghidraRun
	
	@echo "Cleaning up temp files..."
	rm -rf /tmp/ghidra.zip /tmp/ghidra_extracted
	@echo "----------------------------------------------------"
	@echo "Installation complete! Type 'ghidra' to start."

clean: check-root
	@echo "Removing Ghidra..."
	rm -rf $(INSTALL_DIR)
	rm -f $(BIN_PATH)
	@echo "Ghidra removed."
