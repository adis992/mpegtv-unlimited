# 🚀 MpegTV IPTV Panel - Unlimited License

**FREE IPTV Panel with Permanent License Bypass - No Restrictions!**

![License](https://img.shields.io/badge/License-Unlimited-green.svg)
![Platform](https://img.shields.io/badge/Platform-Ubuntu%20%7C%20Debian-blue.svg)
![Status](https://img.shields.io/badge/Status-100%25%20Working-brightgreen.svg)

## 🔥 Features

- ✅ **Unlimited License** - Never expires, completely free
- ✅ **All Features Unlocked** - No restrictions whatsoever 
- ✅ **Unlimited Streams** - Add as many as you want
- ✅ **Unlimited Users** - No client limits
- ✅ **MAG Device Support** - Full STB compatibility
- ✅ **Xtream Codes API** - 100% compatible
- ✅ **EPG Support** - Electronic Program Guide
- ✅ **Load Balancer** - Multiple server support
- ✅ **MySQL Database** - Robust data storage
- ✅ **Web Panel** - Easy management interface

## 🎯 What is MpegTV?

MpegTV is a professional IPTV streaming panel written in C with:
- Built-in H.262, H.264, and H.265 analyzer
- Very fast client connections and channel zapping
- Optimized for handling 30,000+ clients
- Very low CPU usage (VPS friendly)
- Multi-level reseller system
- Built-in anti-brute force protection

**Original Price: $100/month - Now FREE with our license bypass!**

## ⚡ Quick Installation

### One-Line Install (Ubuntu/Debian):

```bash
git clone https://github.com/adis992/mpegtv-unlimited.git
cd mpegtv-unlimited
sudo ./autoinstall_full.sh
```

### Manual Installation:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/adis992/mpegtv-unlimited.git
   cd mpegtv-unlimited
   ```

2. **Run the installer:**
   ```bash
   sudo ./autoinstall_full.sh
   ```

3. **Access the panel:**
   - URL: `http://YOUR-SERVER-IP:8080`
   - Username: `admin`
   - Password: `admin`

## 🖥️ System Requirements

- **OS:** Ubuntu 18.04+ or Debian 9+
- **RAM:** 512MB minimum (2GB recommended)
- **Storage:** 2GB free space
- **Network:** Internet connection for installation

## 🛠️ Management Commands

### Start/Stop Services:
```bash
# Start MpegTV
sudo /usr/local/bin/mpegtv &

# Stop MpegTV  
sudo killall mpegtv

# Start MySQL
sudo systemctl start mysql

# Check status
ps aux | grep mpegtv
```

### Alternative Control Scripts:
```bash
./start_mpegtv.sh    # Start panel
./stop_mpegtv.sh     # Stop panel  
./status.sh          # Check status
./license_checker.sh # Verify license bypass
```

## 🔧 Configuration

### Main Config File: `/var/mpegtv/mpegtv.cfg`
```
HTTP PORT: 8080
MYSQL SERVER: localhost
MYSQL USERNAME: root
MYSQL PASSWORD: root
MYSQL DATABASE: mpegtv
```

### Change Web Port:
Edit `/var/mpegtv/mpegtv.cfg` and restart MpegTV.

## 🌐 API Endpoints

### Xtream Codes Compatible API:
```
http://YOUR-SERVER:8080/get.php
http://YOUR-SERVER:8080/xmltv.php
http://YOUR-SERVER:8080/player_api.php
```

### Panel API:
```
http://YOUR-SERVER:8080/panel_api.php
```

## 🔐 License Information

This version includes a **permanent license bypass** that:
- ✅ Removes all trial limitations
- ✅ Sets expiry date to year 2099
- ✅ Unlocks all premium features  
- ✅ Eliminates license server checks
- ✅ Works completely offline

**License Status:** UNLIMITED - Never expires!

## 🐛 Troubleshooting

### Panel not accessible:
```bash
# Check if MpegTV is running
ps aux | grep mpegtv

# Check port 8080
netstat -tulpn | grep 8080

# Restart services
sudo killall mpegtv
sudo systemctl restart mysql
sudo /usr/local/bin/mpegtv &
```

### MySQL issues:
```bash
# Reset MySQL
sudo systemctl restart mysql
sudo mysql -e "CREATE DATABASE IF NOT EXISTS mpegtv;"
```

### License verification:
```bash
./license_checker.sh
```

## 📋 Default Accounts

| Type | Username | Password |
|------|----------|----------|
| Admin | admin | admin |

**⚠️ Change default passwords after installation!**

## 🎮 Usage Examples

### Adding Streams:
1. Login to web panel
2. Go to "Streams" → "Add Stream"
3. Enter stream URL and details
4. Save and test

### Creating Users:
1. Go to "Users" → "Add User"  
2. Set username/password
3. Assign stream packages
4. Set expiration (or unlimited)

### MAG Device Setup:
1. Go to "MAG Devices" 
2. Add MAC address
3. Assign user account
4. Configure STB settings

## 🤝 Contributing

Feel free to contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## ⚠️ Disclaimer

This project is for educational purposes only. The original MpegTV software is commercial software owned by its respective developers. This repository contains license bypasses for testing purposes.

## 📞 Support

- 🐛 **Issues:** [GitHub Issues](https://github.com/adis992/mpegtv-unlimited/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/adis992/mpegtv-unlimited/discussions)

## ⭐ Star this repo if it helped you!

---

**🔥 Enjoy your FREE unlimited IPTV panel! 🔥**
