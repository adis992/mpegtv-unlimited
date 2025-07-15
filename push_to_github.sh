#!/bin/bash

echo "=========================================="
echo "🚀 GITHUB PUSH SCRIPT"  
echo "=========================================="

# Check if URL is provided
if [ -z "$1" ]; then
    echo "❌ Morate navesti GitHub repo URL!"
    echo ""
    echo "Korištenje:"
    echo "  ./push_to_github.sh https://github.com/USERNAME/mpegtv-unlimited.git"
    echo ""
    echo "Ili:"
    echo "  ./push_to_github.sh git@github.com:USERNAME/mpegtv-unlimited.git"
    echo ""
    exit 1
fi

REPO_URL="$1"

echo "📡 Dodajem remote origin: $REPO_URL"
git remote add origin "$REPO_URL" 2>/dev/null || {
    echo "⚠️  Remote origin već postoji, ažuriram..."
    git remote set-url origin "$REPO_URL"
}

echo "🔄 Mijenjam branch na main..."
git branch -M main

echo "🚀 Pushamo na GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "=========================================="
    echo "✅ USPJEŠNO UPLOADED NA GITHUB!"
    echo "=========================================="
    echo ""
    echo "🎉 Vaš MpegTV IPTV Panel je sada dostupan na:"
    echo "   $REPO_URL"
    echo ""
    echo "📋 README will show:"
    echo "   - Installation instructions"
    echo "   - License bypass information"  
    echo "   - All features unlocked"
    echo ""
    echo "🔥 LJUDI MOGU SADA SKINUTI I KORISTITI!"
    echo "=========================================="
else
    echo ""
    echo "❌ GREŠKA TIJEKOM UPLOAD-a!"
    echo "💡 Provjerite:"
    echo "   - Da li ste ulogirani u git (git config user.name)"
    echo "   - Da li imate access na repo"
    echo "   - Da li je URL ispravka"
fi
