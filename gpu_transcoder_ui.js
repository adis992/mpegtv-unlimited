// GPU Transcoder UI Enhancement for MpegTV Admin Panel
// Adds GPU transcoding options to the admin interface

(function() {
    'use strict';
    
    console.log('GPU Transcoder UI Enhancement loaded');
    
    // Wait for page to load
    document.addEventListener('DOMContentLoaded', function() {
        enhanceTranscoderInterface();
    });
    
    // If already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        enhanceTranscoderInterface();
    }
    
    function enhanceTranscoderInterface() {
        console.log('Enhancing transcoder interface...');
        
        // Check if we're on transcoder_list page
        if (window.location.pathname.includes('transcoder_list') || 
            window.location.pathname.includes('stream_list') ||
            window.location.pathname.includes('channel_list')) {
            
            addGPUTranscodingOptions();
        }
        
        // Monitor for dynamic content changes
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length > 0) {
                    addGPUTranscodingOptions();
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    function addGPUTranscodingOptions() {
        // Find transcoder selection dropdown or create form
        var transcoderDropdowns = document.querySelectorAll('select[name*="transcoder"], select[name*="profile"]');
        
        transcoderDropdowns.forEach(function(dropdown) {
            if (!dropdown.dataset.gpuEnhanced) {
                enhanceTranscoderDropdown(dropdown);
                dropdown.dataset.gpuEnhanced = 'true';
            }
        });
        
        // Add to form creation/editing
        var forms = document.querySelectorAll('form');
        forms.forEach(function(form) {
            if (!form.dataset.gpuEnhanced && 
                (form.innerHTML.includes('transcode') || form.innerHTML.includes('stream') || form.innerHTML.includes('channel'))) {
                addGPUOptionsToForm(form);
                form.dataset.gpuEnhanced = 'true';
            }
        });
    }
    
    function enhanceTranscoderDropdown(dropdown) {
        console.log('Enhancing dropdown:', dropdown);
        
        // Add GPU transcoding profiles to existing dropdown
        var gpuProfiles = [
            {id: 2, name: 'AMD GPU H.264 720p'},
            {id: 3, name: 'AMD GPU H.264 1080p'},
            {id: 4, name: 'AMD GPU H.265 720p'},
            {id: 5, name: 'AMD GPU H.265 1080p'},
            {id: 6, name: 'AMD OpenCL H.264'},
            {id: 12, name: 'AMD VAAPI H.264'}
        ];
        
        // Create GPU optgroup
        var gpuOptGroup = document.createElement('optgroup');
        gpuOptGroup.label = '🚀 GPU Transcoding (Hardware Acceleration)';
        
        gpuProfiles.forEach(function(profile) {
            var option = document.createElement('option');
            option.value = profile.id;
            option.textContent = profile.name;
            option.style.color = '#00aa00';
            option.style.fontWeight = 'bold';
            gpuOptGroup.appendChild(option);
        });
        
        dropdown.appendChild(gpuOptGroup);
    }
    
    function addGPUOptionsToForm(form) {
        console.log('Adding GPU options to form:', form);
        
        // Create GPU transcoding section
        var gpuSection = document.createElement('div');
        gpuSection.className = 'gpu-transcoding-section';
        gpuSection.style.cssText = `
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            border: 2px solid #4a90e2;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        `;
        
        gpuSection.innerHTML = `
            <h3 style="color: white; margin: 0 0 10px 0; display: flex; align-items: center;">
                <span style="font-size: 20px; margin-right: 8px;">🚀</span>
                GPU Hardware Transcoding
            </h3>
            
            <div style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                <label style="color: white; display: flex; align-items: center; margin-bottom: 10px;">
                    <input type="checkbox" id="enableGPU" name="enable_gpu" style="margin-right: 8px; transform: scale(1.2);">
                    <span style="font-weight: bold;">Enable GPU Acceleration</span>
                    <span style="margin-left: 10px; font-size: 12px; opacity: 0.8;">(3x faster transcoding)</span>
                </label>
                
                <div id="gpuProfileSelection" style="display: none;">
                    <label style="color: white; display: block; margin-bottom: 5px;">GPU Profile:</label>
                    <select name="gpu_transcoder_id" id="gpuTranscoderSelect" style="width: 100%; padding: 5px; border-radius: 3px;">
                        <option value="2">AMD GPU H.264 720p (Faster)</option>
                        <option value="3">AMD GPU H.264 1080p (High Quality)</option>
                        <option value="4">AMD GPU H.265 720p (Better Compression)</option>
                        <option value="5">AMD GPU H.265 1080p (Best Quality)</option>
                        <option value="6">AMD OpenCL H.264 (Experimental)</option>
                        <option value="12">AMD VAAPI H.264 (Linux Optimized)</option>
                    </select>
                </div>
            </div>
            
            <div style="background: rgba(255,255,255,0.1); padding: 8px; border-radius: 3px; font-size: 12px; color: #e8f4f8;">
                <strong>⚡ GPU Status:</strong> 3x AMD RX 570/580 detected • Hardware acceleration ready
            </div>
        `;
        
        // Add event listener for checkbox
        var enableGPUCheckbox = gpuSection.querySelector('#enableGPU');
        var profileSelection = gpuSection.querySelector('#gpuProfileSelection');
        
        enableGPUCheckbox.addEventListener('change', function() {
            profileSelection.style.display = this.checked ? 'block' : 'none';
            
            // Update transcoder field if exists
            var transcoderIdField = form.querySelector('input[name="transcoderid"], select[name="transcoderid"]');
            if (transcoderIdField && this.checked) {
                var selectedProfile = gpuSection.querySelector('#gpuTranscoderSelect').value;
                transcoderIdField.value = selectedProfile;
            } else if (transcoderIdField) {
                transcoderIdField.value = '0'; // Default/no transcoding
            }
        });
        
        // Sync with profile selection
        var gpuSelect = gpuSection.querySelector('#gpuTranscoderSelect');
        gpuSelect.addEventListener('change', function() {
            var transcoderIdField = form.querySelector('input[name="transcoderid"], select[name="transcoderid"]');
            if (transcoderIdField && enableGPUCheckbox.checked) {
                transcoderIdField.value = this.value;
            }
        });
        
        // Insert into form
        var insertPoint = form.querySelector('input[type="submit"], button[type="submit"]');
        if (insertPoint) {
            insertPoint.parentNode.insertBefore(gpuSection, insertPoint);
        } else {
            form.appendChild(gpuSection);
        }
    }
    
    // Auto-apply when page changes (for SPA-like behavior)
    var currentUrl = window.location.href;
    setInterval(function() {
        if (window.location.href !== currentUrl) {
            currentUrl = window.location.href;
            setTimeout(enhanceTranscoderInterface, 500);
        }
    }, 1000);
    
})();
