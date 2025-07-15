#!/bin/bash

echo "=========================================="
echo "🚀 MpegTV IPTV Panel - UNLIMITED LICENSE"
echo "=========================================="
echo "🔓 Auto-installer with permanent license bypass"
echo "💯 No restrictions, no expiry, 100% free!"
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ This script must be run as root (sudo)"
    echo "💡 Run: sudo ./autoinstall_full.sh"
    exit 1
fi

# Check OS
if ! command -v lsb_release &> /dev/null; then
    echo "❌ This script requires Ubuntu/Debian"
    exit 1
fi

OS_DISTRIBUTOR=$(lsb_release -a 2>/dev/null | grep Distributor | awk '{ print $3 }')
if [ "$OS_DISTRIBUTOR" != "Ubuntu" ]; then
    echo "❌ This script is designed for Ubuntu"
    echo "📋 Detected: $OS_DISTRIBUTOR" 
    exit 1
fi

echo "✅ OS Check: Ubuntu detected"
echo ""

# Update system
echo "📦 Updating system packages..."
apt update -y
apt install -y ffmpeg xz-utils gzip unzip psmisc net-tools mysql-server mysql-client curl wget
apt install -y libmysqlclient*

echo ""
echo "📁 Installing MpegTV files..."

# Copy binaries
cp mpegtv /usr/local/bin/mpegtv
cp slave /usr/local/bin/slave
chmod 755 /usr/local/bin/mpegtv
chmod 755 /usr/local/bin/slave

# Create directories
mkdir -p /var/mpegtv
cp -r panel_data/* /var/mpegtv/
cp mpegtv.cfg /var/mpegtv/
cp *.csv /var/mpegtv/ 2>/dev/null || true

# Set permissions
chown -R root:root /var/mpegtv
chmod -R 755 /var/mpegtv

echo ""
echo "🗄️  Setting up MySQL database..."

# Start MySQL
systemctl start mysql
systemctl enable mysql

# Wait for MySQL to start
sleep 3

# Create database
mysql -e "CREATE DATABASE IF NOT EXISTS mpegtv;" 2>/dev/null || true
mysql -e "CREATE USER IF NOT EXISTS 'root'@'localhost' IDENTIFIED BY 'root';" 2>/dev/null || true
mysql -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';" 2>/dev/null || true
mysql -e "FLUSH PRIVILEGES;" 2>/dev/null || true

echo ""
echo "🚀 Starting MpegTV..."

# Start MpegTV
cd /var/mpegtv
/usr/local/bin/mpegtv &

# Wait for startup
sleep 5

echo ""
echo "✅ Installation completed successfully!"
echo ""
echo "=========================================="
echo "🎉 MpegTV IPTV Panel is now running!"
echo "=========================================="
echo ""
echo "🌐 Web Interface: http://$(hostname -I | awk '{print $1}'):8080"
echo "🌐 Local Access:  http://localhost:8080"
echo ""
echo "👤 Default Login:"
echo "   Username: admin"
echo "   Password: admin"
echo ""
echo "🔒 License Status: UNLIMITED (Never expires)"
echo "💯 Features: ALL UNLOCKED"
echo ""
echo "📝 Management Commands:"
echo "   systemctl start mysql    - Start MySQL"
echo "   /usr/local/bin/mpegtv &  - Start MpegTV"
echo "   killall mpegtv           - Stop MpegTV"
echo ""
echo "🎯 Panel Features:"
echo "   ✅ Unlimited streams"
echo "   ✅ Unlimited users" 
echo "   ✅ MAG device support"
echo "   ✅ Xtream Codes API"
echo "   ✅ EPG support"
echo "   ✅ Load balancer support"
echo ""
echo "🔥 ENJOY YOUR FREE IPTV PANEL!"
echo "=========================================="
