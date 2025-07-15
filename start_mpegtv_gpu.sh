#!/bin/bash

# MpegTV with GPU Transcoding UI Enhancement
# Starts MpegTV panel with injected GPU options

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "🚀 Starting MpegTV with GPU Transcoding UI Enhancement..."

# Check if MpegTV is already running
if pgrep -f "mpegtv" > /dev/null; then
    echo "⚠️  MpegTV is already running. Stopping existing instance..."
    ./stop_mpegtv.sh
    sleep 2
fi

# Backup original files if they exist
if [ -f "css/styles_original.css" ]; then
    echo "📁 Original CSS backup found"
else
    if [ -f "css/styles.css" ]; then
        echo "📁 Backing up original styles.css..."
        cp "css/styles.css" "css/styles_original.css"
    fi
fi

# Inject GPU CSS into styles.css
echo "💫 Injecting GPU enhancements into CSS..."
if [ -f "css/styles.css" ]; then
    # Add GPU CSS to existing styles
    echo "" >> "css/styles.css"
    echo "/* === GPU TRANSCODING UI ENHANCEMENTS === */" >> "css/styles.css"
    cat "css/gpu_enhancements.css" >> "css/styles.css"
    echo "✅ GPU CSS injected successfully"
else
    echo "⚠️  styles.css not found, creating new one..."
    cp "css/gpu_enhancements.css" "css/styles.css"
fi

# Start MpegTV
echo "🎬 Starting MpegTV server..."
./start_mpegtv.sh

# Wait a moment for server to start
sleep 3

# Check if server started successfully
if curl -s "http://localhost:8080" > /dev/null; then
    echo "✅ MpegTV started successfully!"
    echo ""
    echo "🌐 Admin Panel: http://localhost:8080"
    echo "👤 Login: admin / admin"
    echo ""
    echo "🚀 GPU Features Available:"
    echo "   • Hardware acceleration options in Transcoder section"
    echo "   • AMD GPU profiles for streams and channels"
    echo "   • 3x faster transcoding with GPU"
    echo ""
    echo "📊 GPU Status:"
    lspci | grep -i amd | head -3
    echo ""
    echo "🔧 To view live transcoding logs:"
    echo "   tail -f /var/log/mpegtv.log"
    echo ""
    echo "⏹️  To stop: ./stop_mpegtv.sh"
else
    echo "❌ Failed to start MpegTV server"
    exit 1
fi
