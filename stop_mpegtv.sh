#!/bin/bash

echo "Zaustavljanje MpegTV IPTV Panel-a..."

# Kill all MpegTV processes
sudo killall mpegtv 2>/dev/null

echo "MpegTV je zaustavljen!"
