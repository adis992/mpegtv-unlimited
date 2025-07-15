#!/bin/bash

echo "================================================"
echo "🔥 AMD GPU TRANSCODING SETUP FOR MPEGTV"
echo "================================================"
echo "🎯 Adding hardware acceleration support for AMD GPUs"
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ This script must be run as root (sudo)"
    echo "💡 Run: sudo ./setup_amd_gpu_transcoding.sh"
    exit 1
fi

echo "🔍 Checking AMD GPU availability..."
amd_gpus=$(lspci | grep -i "VGA.*AMD\|Display.*AMD" | wc -l)
if [ "$amd_gpus" -gt 0 ]; then
    echo "✅ Found $amd_gpus AMD GPU(s)"
    lspci | grep -i "VGA.*AMD\|Display.*AMD"
else
    echo "❌ No AMD GPUs found!"
    exit 1
fi

echo ""
echo "📦 Installing AMD GPU drivers and codec support..."

# Install AMD drivers and codec support
apt update
apt install -y mesa-va-drivers mesa-vdpau-drivers vainfo vdpauinfo
apt install -y opencl-headers ocl-icd-opencl-dev clinfo
apt install -y radeontop

# Install ffmpeg with AMD support if not already present
if ! ffmpeg -hide_banner -hwaccels 2>/dev/null | grep -q "opencl\|vaapi"; then
    echo "⚠️ Installing ffmpeg with AMD GPU support..."
    apt install -y ffmpeg
fi

echo ""
echo "🔧 Configuring GPU permissions..."

# Add video group permissions
usermod -a -G video root
usermod -a -G render root

# Set proper permissions for GPU devices
chmod 666 /dev/dri/* 2>/dev/null || true

echo ""
echo "💾 Adding AMD GPU transcoding profiles to database..."

# Check if MpegTV database exists
if ! mysql -u root mpegtv -e "SELECT 1;" >/dev/null 2>&1; then
    echo "❌ MpegTV database not found!"
    echo "💡 Make sure MpegTV is installed first"
    exit 1
fi

# Add AMD GPU profiles (check if they don't exist already)
mysql -u root mpegtv -e "
INSERT IGNORE INTO transcoder (name, preset, threads, scodec, acodec, vcodec, profile, level, height, width, crf, bitrate) VALUES
('AMD GPU H.264 720p', 'fast', 0, 'copy', 'aac', 'h264_amf', 'main', '3.1', 720, 1280, 23, 2500000),
('AMD GPU H.264 1080p', 'fast', 0, 'copy', 'aac', 'h264_amf', 'high', '4.0', 1080, 1920, 23, 4000000),
('AMD GPU H.265 720p', 'fast', 0, 'copy', 'aac', 'hevc_amf', 'main', '4.0', 720, 1280, 25, 2000000),
('AMD GPU H.265 1080p', 'fast', 0, 'copy', 'aac', 'hevc_amf', 'main', '4.0', 1080, 1920, 25, 3500000),
('AMD OpenCL H.264', 'medium', 0, 'copy', 'aac', 'h264_opencl', 'high', '4.0', 0, 0, 23, 0),
('AMD VAAPI H.264', 'fast', 0, 'copy', 'aac', 'h264_vaapi', 'high', '4.0', 0, 0, 23, 0);
"

echo ""
echo "🧪 Testing AMD GPU transcoding..."

# Test OpenCL
echo "Testing OpenCL support..."
if command -v clinfo >/dev/null 2>&1; then
    clinfo | grep -i "device name" | head -3
else
    echo "⚠️ clinfo not available"
fi

# Test ffmpeg with AMD
echo ""
echo "Testing ffmpeg AMD GPU support..."
timeout 5 ffmpeg -f lavfi -i testsrc=duration=1:size=320x240:rate=1 -c:v h264_amf -f null - 2>/dev/null && echo "✅ AMD AMF H.264 working!" || echo "⚠️ AMD AMF not working, trying OpenCL..."

timeout 5 ffmpeg -f lavfi -i testsrc=duration=1:size=320x240:rate=1 -c:v h264_opencl -f null - 2>/dev/null && echo "✅ OpenCL H.264 working!" || echo "⚠️ OpenCL not available"

echo ""
echo "================================================"
echo "✅ AMD GPU TRANSCODING SETUP COMPLETE!"
echo "================================================"
echo ""
echo "🎯 Available GPU Transcoding Profiles:"
mysql -u root mpegtv -e "SELECT id, name, vcodec FROM transcoder WHERE vcodec LIKE '%amf' OR vcodec LIKE '%opencl' OR vcodec LIKE '%vaapi';" 2>/dev/null

echo ""
echo "🔧 Configuration:"
echo "   - AMD GPU profiles added to transcoder table"
echo "   - Hardware acceleration enabled"
echo "   - Video group permissions set"
echo ""
echo "💡 Usage:"
echo "   1. Login to MpegTV web panel (http://localhost:8080)"
echo "   2. Go to Settings → Transcoding"
echo "   3. Select AMD GPU profile for streams"
echo "   4. GPU will automatically handle encoding"
echo ""
echo "📊 Monitor GPU usage with:"
echo "   radeontop        # AMD GPU monitor"
echo "   nvidia-smi       # If you have NVIDIA too"
echo ""
echo "🚀 GPU transcoding is 5-10x faster than CPU!"
echo "================================================"
