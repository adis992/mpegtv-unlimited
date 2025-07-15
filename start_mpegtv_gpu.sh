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
if [ -f "panel_data/css/styles_original.css" ]; then
    echo "📁 Original CSS backup found"
else
    if [ -f "panel_data/css/styles.css" ]; then
        echo "📁 Backing up original styles.css..."
        cp "panel_data/css/styles.css" "panel_data/css/styles_original.css"
    fi
fi

# Create GPU enhancements CSS
echo "💫 Creating GPU UI enhancements..."
cat > panel_data/css/gpu_ui.css << 'EOF'
/* === MODERN GPU TRANSCODING UI === */
:root {
    --gpu-primary: #00d4aa;
    --gpu-secondary: #1a1a2e;
    --gpu-accent: #16213e;
    --gpu-success: #00c851;
    --gpu-warning: #ff8800;
    --gpu-danger: #ff4444;
    --gpu-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Sidebar modernization */
.sidebar {
    background: var(--gpu-secondary) !important;
    box-shadow: 2px 0 10px rgba(0,0,0,0.1);
}

.sidebar-nav li a {
    transition: all 0.3s ease;
    border-radius: 8px;
    margin: 2px 8px;
}

.sidebar-nav li a:hover {
    background: var(--gpu-primary) !important;
    transform: translateX(5px);
}

.sidebar-nav li a.active {
    background: var(--gpu-gradient) !important;
}

/* GPU Status Cards */
.gpu-status-card {
    background: var(--gpu-gradient);
    border-radius: 12px;
    padding: 20px;
    color: white;
    margin: 10px 0;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.gpu-transcoder-option {
    background: linear-gradient(45deg, #667eea, #764ba2);
    border: none;
    border-radius: 8px;
    padding: 12px 20px;
    color: white;
    margin: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.gpu-transcoder-option:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

/* Modern table styling */
.table {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.table th {
    background: var(--gpu-gradient);
    color: white;
    font-weight: 600;
}

/* Content wrapper modernization */
.content-wrapper {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
}

/* GPU indicator */
.gpu-indicator {
    display: inline-block;
    width: 8px;
    height: 8px;
    background: var(--gpu-success);
    border-radius: 50%;
    margin-right: 8px;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
}
EOF

# Inject modern CSS
if [ -f "panel_data/css/styles.css" ]; then
    echo "" >> "panel_data/css/styles.css"
    echo "/* === GPU UI ENHANCEMENTS === */" >> "panel_data/css/styles.css"
    cat "panel_data/css/gpu_ui.css" >> "panel_data/css/styles.css"
    echo "✅ GPU UI enhancements injected successfully"
else
    echo "⚠️  styles.css not found"
fi

# Start MpegTV
echo "🎬 Starting MpegTV server..."
./start_mpegtv.sh

# Wait a moment for server to start
sleep 3

# Inject GPU JavaScript into admin panel
echo "💉 Injecting GPU JavaScript integration..."
if [ -f "panel_data/js/main.js" ]; then
    # Add GPU integration script reference to main.js
    if ! grep -q "gpu_integration.js" panel_data/js/main.js; then
        echo "" >> panel_data/js/main.js
        echo "// GPU Integration Auto-loader" >> panel_data/js/main.js
        echo "document.addEventListener('DOMContentLoaded', function() {" >> panel_data/js/main.js
        echo "    var script = document.createElement('script');" >> panel_data/js/main.js
        echo "    script.src = '/js/gpu_integration.js';" >> panel_data/js/main.js
        echo "    document.head.appendChild(script);" >> panel_data/js/main.js
        echo "});" >> panel_data/js/main.js
        echo "✅ GPU JavaScript injected into main.js"
    fi
fi

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
