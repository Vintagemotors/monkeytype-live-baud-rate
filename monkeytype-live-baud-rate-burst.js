// ==UserScript==
// @name         MonkeyType Live Baud Rate (Burst)
// @namespace    vintagemotors.github.io
// @version      1.1
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

            // Check if the baud rate number element exists
            let baudNumberElement = document.querySelector('.timerMain .baud-rate-number');
            if (!baudNumberElement) {
                baudNumberElement = document.createElement('div');
                baudNumberElement.className = 'baud-rate-number';
                baudNumberElement.style.display = 'inline-block'; // Ensure it stays inline
                burstElement.insertAdjacentElement('afterend', baudNumberElement);
            }

            // Check if the baud text element exists
            let baudTextElement = document.querySelector('.timerMain .baud-rate-text');
            if (!baudTextElement) {
                baudTextElement = document.createElement('div');
                baudTextElement.className = 'baud-rate-text';
                baudTextElement.style.display = 'inline-block'; // Ensure it stays inline
                baudNumberElement.insertAdjacentElement('afterend', baudTextElement);
            }

            // Update the elements
            baudNumberElement.innerText = '\u00A0\u00A0' + baudRate
            baudTextElement.innerText = '\u00A0baud';
        } else {
            // Remove the baud rate elements if burst is hidden
            document.querySelector('.timerMain .baud-rate-number')?.remove();
            document.querySelector('.timerMain .baud-rate-text')?.remove();
        }
    }

    // Periodically check for the visibility of the burst element
    const checkVisibilityInterval = setInterval(updateLiveBaudRate, 500);

    // Stop checking when the page is no longer visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(checkVisibilityInterval);
        }
    });

    // Trigger an initial update when the page is loaded
    updateLiveBaudRate();
})();
