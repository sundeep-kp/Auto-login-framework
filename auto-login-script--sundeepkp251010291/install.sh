#!/bin/bash
set -e

SYSTEMD_DIR="$HOME/.config/systemd/user"
BIN_DIR="$HOME/bin"

echo "[*] Creating necessary directories..."
mkdir -p "$SYSTEMD_DIR"
mkdir -p "$BIN_DIR"
# -------------------------------
# Check for Node.js
# -------------------------------
if ! command -v node &> /dev/null; then
    echo "[*] Node.js not found. Installing Node.js..."
    # Example for Debian/Ubuntu; adjust for other distros
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "[*] Node.js is already installed."
fi

# -------------------------------
# Check for Puppeteer
# -------------------------------
if ! node -e "require('puppeteer')" &> /dev/null; then
    echo "[*] Puppeteer not found. Installing Puppeteer..."
    npm install puppeteer --prefix "$BIN_DIR"
else
    echo "[*] Puppeteer is already installed."
fi

echo "[*] Copying service, timer, and script files..."
cp cyberoam-login.service "$SYSTEMD_DIR/"
cp cyberoam-login.timer "$SYSTEMD_DIR/"
cp cyberoam-login.js "$BIN_DIR/"

# Prompt user for credentials
echo "[*] Let's set up your Cyberoam credentials."
read -p "Enter your username: " USERNAME
echo "[*] Now you'll be prompted to enter your password, enter it carefully , it'll not be visible in the terminal for security reasons. --sundeep :D"
read -s -p "Enter your password: " PASSWORD
echo
# Save creds.json
cat > "$BIN_DIR/creds.json" <<EOL
{
  "username": "$USERNAME",
  "password": "$PASSWORD"
}
EOL

echo "[*] Reloading systemd daemon..."
systemctl --user daemon-reload

echo "[*] Enabling and starting the timer..."
systemctl --user enable --now cyberoam-login.timer

echo "[*] Done! Autologin should now be active."
echo "      You can check status with: systemctl --user status cyberoam-login.service"

