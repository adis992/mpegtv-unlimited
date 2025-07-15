// ==UserScript==
// @name         MpegTV GPU Transcoding UI Enhancement
// @namespace    http://localhost:8080/
// @version      1.0
// @description  Adds GPU transcoding options to MpegTV admin panel
// @author       You
// @match        http://localhost:8080/*
// @match        http://127.0.0.1:8080/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    
    // Load the GPU UI enhancement script
    var script = document.createElement('script');
    script.src = '/gpu_transcoder_ui.js';
    script.onload = function() {
        console.log('GPU Transcoder UI Enhancement loaded successfully');
    };
    
    // Add script when DOM is ready
    if (document.head) {
        document.head.appendChild(script);
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            document.head.appendChild(script);
        });
    }
    
})();
