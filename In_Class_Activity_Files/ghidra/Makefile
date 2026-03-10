# Variables
GHIDRA_VERSION = 11.3.1
GHIDRA_DATE = 20250219
GHIDRA_URL = https://github.com/NationalSecurityAgency/ghidra/releases/download/Ghidra_$(GHIDRA_VERSION)_build/ghidra_$(GHIDRA_VERSION)_PUBLIC_$(GHIDRA_DATE).zip
INSTALL_DIR = /opt/ghidra
BIN_PATH = /usr/local/bin/ghidra
JDK_PATH = /usr/lib/jvm/java-21-openjdk-amd64

.PHONY: all install dependencies clean check-root

all: check-root dependencies install

check-root:
	@if [ "$$(id -u)" -ne 0 ]; then \
		echo "Error: Please run with sudo (sudo make)"; \
		exit 1; \
	fi

dependencies:
	@echo "Installing OpenJDK 21..."
	apt-get update
	apt-get install -y wget unzip openjdk-21-jdk

install:
	@echo "Downloading Ghidra..."
	rm -f /tmp/ghidra.zip
	wget -q --show-progress $(GHIDRA_URL) -O /tmp/ghidra.zip
	
	@echo "Extracting..."
	rm -rf /tmp/ghidra_extracted
	mkdir -p /tmp/ghidra_extracted
	unzip -q /tmp/ghidra.zip -d /tmp/ghidra_extracted
	
	@echo "Installing to $(INSTALL_DIR)..."
	mkdir -p $(INSTALL_DIR)
	cp -r /tmp/ghidra_extracted/*/* $(INSTALL_DIR)
	
	@echo "Configuring Ghidra to use JDK 21..."
	# This line tells Ghidra exactly where to find the correct Java version
	echo "JDK_HOME=$(JDK_PATH)" >> $(INSTALL_DIR)/support/launch.properties
	
	@echo "Setting up symlink..."
	ln -sf $(INSTALL_DIR)/ghidraRun $(BIN_PATH)
	chmod +x $(INSTALL_DIR)/ghidraRun
	
	@echo "Cleaning up..."
	rm -rf /tmp/ghidra.zip /tmp/ghidra_extracted
	@echo "----------------------------------------------------"
	@echo "Done! Type 'ghidra' to launch."

clean: check-root
	rm -rf $(INSTALL_DIR)
	rm -f $(BIN_PATH)
