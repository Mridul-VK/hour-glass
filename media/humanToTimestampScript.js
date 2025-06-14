/// <reference path="../src/webview-globals.d.ts" />
// Acquire the VS Code API object to communicate with the extension host.
// This must be done once at the top level of your script.
const vscode = acquireVsCodeApi();

// Get references to all input elements.
const yearInput = /** @type {HTMLInputElement} */ (document.getElementById('yearInput')); // Fixes 'document' not defined and 'value' errors
const monthInput = /** @type {HTMLInputElement} */ (document.getElementById('monthInput')); // Fixes 'document' not defined and 'value' errors
const dayInput = /** @type {HTMLInputElement} */ (document.getElementById('dayInput')); // Fixes 'document' not defined and 'value' errors
const hourInput = /** @type {HTMLInputElement} */ (document.getElementById('hourInput')); // Fixes 'document' not defined and 'value' errors
const minuteInput = /** @type {HTMLInputElement} */ (document.getElementById('minuteInput')); // Fixes 'document' not defined and 'value' errors
const secondInput = /** @type {HTMLInputElement} */ (document.getElementById('secondInput')); // Fixes 'document' not defined and 'value' errors
const timezoneSelect = /** @type {HTMLSelectElement} */ (document.getElementById('timezoneSelect')); // For <select> elements, it's HTMLSelectElement
const convertHumanToTimestampButton = /** @type {HTMLButtonElement} */ (document.getElementById('convertHumanToTimestampButton')); // For <button> elements, it's HTMLButtonElement
const humanToTimestampResultDisplay = /** @type {HTMLDivElement} */ (document.getElementById('humanToTimestampResultDisplay')); // For <div> elements, it's HTMLDivElement (no value property here, but good practice)

/**
 * Handles the click event on the convert button for human-to-timestamp.
 * Collects all date and time inputs and sends them to the extension host.
 */
convertHumanToTimestampButton.addEventListener('click', () => {
    // Collect all input values into a single object.
    const dateFields = {
        year: yearInput.value,
        month: monthInput.value,
        day: dayInput.value,
        hour: hourInput.value,
        minute: minuteInput.value,
        second: secondInput.value,
        timezone: timezoneSelect.value
    };

    // Post a message to the extension with the 'submitHumanDate' command
    // and the collected date fields data.
    vscode.postMessage({
        command: 'submitHumanDate',
        dateFields: dateFields
    });
});

/**
 * Listens for messages from the extension host.
 * Updates the output div with the conversion result.
 */
window.addEventListener('message', event => {
    const message = event.data; // The JSON data from the extension host.

    switch (message.command) {
        case 'updateHumanToTimestampResult':
            // If the command is 'updateHumanToTimestampResult', update the inner HTML
            // of the result display div with the content provided by the extension.
            humanToTimestampResultDisplay.innerHTML = message.content;
            break;
    }
});