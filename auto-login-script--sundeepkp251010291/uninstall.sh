#!/bin/bash
set -e

echo "[*] Stopping and disabling timer/service..."
systemctl --user stop cyberoam-login.timer cyberoam-login.service
systemctl --user disable cyberoam-login.timer cyberoam-login.service

echo "[*] Removing files..."
rm -f ~/.config/systemd/user/cyberoam-login.service
rm -f ~/.config/systemd/user/cyberoam-login.timer
rm -f ~/bin/cyberoam-login.js ~/bin/creds.json

echo "[*] Done!"

