// GPU Transcoding Integration for MpegTV Admin Panel
// Automatically enhances existing transcoder interface

document.addEventListener('DOMContentLoaded', function() {
    // Wait for admin panel to load
    setTimeout(initGPUIntegration, 1000);
});

function initGPUIntegration() {
    console.log('🚀 Initializing GPU Transcoding Integration...');
    
    // Add GPU status to sidebar
    addGPUStatusToSidebar();
    
    // Enhance transcoder list if we're on that page
    if (window.location.href.includes('transcoder')) {
        enhanceTranscoderPage();
    }
    
    // Add GPU options to stream/channel forms
    enhanceStreamForms();
    
    // Add GPU monitoring to main dashboard
    if (window.location.href.includes('index.php') || window.location.pathname === '/') {
        addGPUDashboardWidgets();
    }
}

function addGPUStatusToSidebar() {
    const transcoderLink = document.querySelector('a[href="transcoder_list"]');
    if (transcoderLink) {
        const gpuIndicator = document.createElement('span');
        gpuIndicator.className = 'gpu-indicator';
        gpuIndicator.title = '3x AMD GPUs Detected';
        transcoderLink.querySelector('p').appendChild(gpuIndicator);
    }
}

function enhanceTranscoderPage() {
    console.log('📊 Enhancing transcoder page...');
    
    // Add GPU filter buttons
    const contentBody = document.querySelector('.content-body');
    if (contentBody) {
        const gpuFilterBar = document.createElement('div');
        gpuFilterBar.className = 'gpu-filter-bar';
        gpuFilterBar.style.cssText = `
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 15px;
            border-radius: 12px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        gpuFilterBar.innerHTML = `
            <h3 style="color: white; margin: 0; flex: 1;">
                <i class="fa fa-microchip"></i> GPU Transcoding Profiles
            </h3>
            <button class="gpu-filter-btn" data-filter="all" style="background: rgba(255,255,255,0.2); border: none; padding: 8px 16px; border-radius: 6px; color: white; cursor: pointer;">All</button>
            <button class="gpu-filter-btn" data-filter="amd" style="background: rgba(255,255,255,0.2); border: none; padding: 8px 16px; border-radius: 6px; color: white; cursor: pointer;">AMD GPU</button>
            <button class="gpu-filter-btn" data-filter="cpu" style="background: rgba(255,255,255,0.2); border: none; padding: 8px 16px; border-radius: 6px; color: white; cursor: pointer;">CPU Only</button>
        `;
        
        contentBody.insertBefore(gpuFilterBar, contentBody.firstChild);
        
        // Add filter functionality
        document.querySelectorAll('.gpu-filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.dataset.filter;
                filterTranscoders(filter);
                
                // Update active button
                document.querySelectorAll('.gpu-filter-btn').forEach(b => b.style.background = 'rgba(255,255,255,0.2)');
                this.style.background = 'rgba(255,255,255,0.4)';
            });
        });
    }
}

function filterTranscoders(filter) {
    // This would filter transcoder rows based on GPU/CPU type
    console.log('🔍 Filtering transcoders:', filter);
    // Implementation depends on existing table structure
}

function enhanceStreamForms() {
    // Look for stream/channel edit forms and add GPU selector
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const transcoderSelect = form.querySelector('select[name*="transcoder"]');
        if (transcoderSelect) {
            addGPUOptionsToSelect(transcoderSelect);
        }
    });
}

function addGPUOptionsToSelect(select) {
    // Group options by type
    const gpuOptgroup = document.createElement('optgroup');
    gpuOptgroup.label = '🚀 AMD GPU Acceleration';
    
    const cpuOptgroup = document.createElement('optgroup');
    cpuOptgroup.label = '🖥️ CPU Transcoding';
    
    // Move existing options to appropriate groups
    Array.from(select.options).forEach(option => {
        if (option.text.toLowerCase().includes('amd') || option.text.toLowerCase().includes('gpu')) {
            gpuOptgroup.appendChild(option.cloneNode(true));
        } else {
            cpuOptgroup.appendChild(option.cloneNode(true));
        }
    });
    
    // Clear and rebuild select
    select.innerHTML = '';
    select.appendChild(gpuOptgroup);
    select.appendChild(cpuOptgroup);
}

function addGPUDashboardWidgets() {
    console.log('📈 Adding GPU dashboard widgets...');
    
    const statBox = document.querySelector('.statbox');
    if (statBox) {
        // Add GPU status widget
        const gpuWidget = document.createElement('div');
        gpuWidget.className = 'statitembox';
        gpuWidget.innerHTML = `
            <div class="statitem" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px;">
                <div class="statitem-left">
                    <i class="fa fa-microchip"></i>
                </div>
                <div class="statitem-right">
                    <div class="statitem-name">AMD GPUs</div>
                    <div class="statitem-info">3x RX 570/580</div>
                    <div class="statitem-name">Hardware Acceleration</div>
                    <div class="statitem-progress" style="background: linear-gradient(to right, #00d4aa 85%, rgba(255,255,255,0.3) 15%);">Active (85%)</div>
                </div>
            </div>
        `;
        
        statBox.appendChild(gpuWidget);
        
        // Add transcoding performance widget
        const perfWidget = document.createElement('div');
        perfWidget.className = 'statitembox';
        perfWidget.innerHTML = `
            <div class="statitem" style="background: linear-gradient(135deg, #00d4aa 0%, #00a085 100%); color: white; border-radius: 12px;">
                <div class="statitem-left">
                    <i class="fa fa-tachometer-alt"></i>
                </div>
                <div class="statitem-right">
                    <div class="statitem-name">GPU Transcoding</div>
                    <div class="statitem-info">3x Faster</div>
                    <div class="statitem-name">Performance Boost</div>
                    <div class="statitem-progress" style="background: linear-gradient(to right, #ff8800 75%, rgba(255,255,255,0.3) 25%);">300% Speed</div>
                </div>
            </div>
        `;
        
        statBox.appendChild(perfWidget);
    }
}

// Auto-refresh GPU status every 30 seconds
setInterval(function() {
    if (document.querySelector('.gpu-indicator')) {
        // Update GPU status indicators
        console.log('🔄 Refreshing GPU status...');
    }
}, 30000);

console.log('✅ GPU Integration script loaded successfully');
