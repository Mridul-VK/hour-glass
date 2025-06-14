/// <reference path="../src/webview-globals.d.ts" />
// Acquire the VS Code API object to communicate with the extension host.
// This must be done once at the top level of your script.
const vscode = acquireVsCodeApi();

// Get references to the HTML elements.
const timestampInput = /** @type {HTMLInputElement} */ (document.getElementById('timestampInput')); // Add type assertion
const convertTimestampButton = /** @type {HTMLButtonElement} */ (document.getElementById('convertTimestampButton')); // Add type assertion
const timestampResultDisplay = /** @type {HTMLDivElement} */ (document.getElementById('timestampResultDisplay')); // Add type assertion

/**
 * Handles the click event on the convert button.
 * Sends the user's timestamp input to the extension host.
 */
convertTimestampButton.addEventListener('click', () => {
    // Post a message to the extension with the 'submitTimestampText' command
    // and the current value from the timestamp input field.
    vscode.postMessage({
        command: 'submitTimestampText',
        text: timestampInput.value
    });
});

/**
 * Listens for messages from the extension host.
 * Updates the output div with the conversion result.
 */
window.addEventListener('message', event => {
    const message = event.data; // The JSON data from the extension host.

    switch (message.command) {
        case 'updateTimestampResult':
            // If the command is 'updateTimestampResult', update the inner HTML
            // of the result display div with the content provided by the extension.
            timestampResultDisplay.innerHTML = message.content;
            break;
    }
});