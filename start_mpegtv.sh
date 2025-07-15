#!/bin/bash

echo "Pokretanje MpegTV IPTV Panel-a (Unlimited License)..."

# Kill any existing instances
sudo killall mpegtv 2>/dev/null

# Start MySQL if not running
sudo systemctl start mysql

echo "Starting MpegTV with unlimited license..."

# Start MpegTV (now permanently patched for unlimited license)
cd /var/mpegtv
sudo /usr/local/bin/mpegtv &

sleep 3

echo "MpegTV je pokrenut!"
echo "Otvorite web browser i idite na: http://localhost:8080"
echo "Default login: admin/admin"

# Optional: automatically open browser
# xdg-open http://localhost:8080
