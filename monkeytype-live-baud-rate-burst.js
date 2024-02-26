// ==UserScript==
// @name         MonkeyType Live Baud Rate (Burst) 
// @namespace    vintagemotors.github.io
// @version      1.0
// @description  Add live baud rate to MonkeyType.com using burst attribute
// @author       Vintagemotors
// @match        https://monkeytype.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to calculate baud rate based on burst attribute
    function calculateBaudRate(burst) {
        // Assuming 1 start bit, 7 data bits, and 1 stop bit
        const bitsPerCharacter = 9;
        const baudRate = (burst / 60) * bitsPerCharacter;
        return baudRate.toFixed(0); // Clamp accuracy to whole numbers
    }

    // Function to update live baud rate
    function updateLiveBaudRate() {
        const burstElement = document.querySelector('.timerMain .burst:not(.hidden)');

        if (burstElement) {
            const burst = parseFloat(burstElement.innerText);
            const baudRate = calculateBaudRate(burst);

            // Create a new div for baud rate
            const baudRateElement = document.querySelector('.timerMain .baud-rate');
            if (baudRateElement) {
                baudRateElement.innerText = '\u00A0\u00A0' + baudRate + ' baud'; // Add two non-breaking spaces
            } else {
                // Insert the baud rate element after the burst element
                burstElement.insertAdjacentHTML('afterend', `<div class="baud-rate">\u00A0\u00A0${baudRate} baud</div>`); // Add two non-breaking spaces
            }
        } else {
            // Hide the baud rate element when the burst is hidden
            const existingBaudRateElement = document.querySelector('.timerMain .baud-rate');
            if (existingBaudRateElement) {
                existingBaudRateElement.remove();
            }
        }
    }

    // Periodically check for the visibility of the burst element
    const checkVisibilityInterval = setInterval(function() {
        updateLiveBaudRate();
    }, 500);

    // Stop checking when the page is no longer visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(checkVisibilityInterval);
        }
    });

    // Trigger an initial update when the page is loaded
    updateLiveBaudRate();
})();
