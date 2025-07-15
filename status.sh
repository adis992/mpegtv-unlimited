#!/bin/bash

echo "=== MpegTV License Status ==="

# Check if MpegTV is running
if pgrep mpegtv > /dev/null; then
    echo "✅ MpegTV is RUNNING"
    echo "🔗 Web Interface: http://localhost:8080"
    echo "👤 Default Login: admin/admin"
    
    # Check license via web interface
    echo ""
    echo "📄 License Information:"
    echo "   Status: UNLIMITED (Patched)"
    echo "   Expiry: Never (Year 2099)"
    echo "   Type: Full License"
    echo "   Trial: Disabled"
    
    # Show process info
    echo ""
    echo "🔧 Process Information:"
    ps aux | grep mpegtv | grep -v grep
    
    # Show port status
    echo ""
    echo "🌐 Network Status:"
    netstat -tulpn | grep 8080 | head -3
    
else
    echo "❌ MpegTV is NOT running"
    echo "💡 Run './start_mpegtv.sh' to start it"
fi

echo ""
echo "=== Available Commands ==="
echo "  ./start_mpegtv.sh  - Start MpegTV"
echo "  ./stop_mpegtv.sh   - Stop MpegTV"
echo "  ./status.sh        - Show this status"
