/**
 * @typedef {import('vscode').Uri} Uri
 */

/**
 * Generates the HTML content for the human-readable date to Unix timestamp converter webview.
 * Includes input fields for date/time components, a timezone selector, and links to assets.
 *
 * @param {Uri} styleSheetUri - The URI for the shared CSS stylesheet.
 * @param {Uri} viewScriptUri - The URI for the view-specific JavaScript script.
 * @returns {string} The full HTML string for the webview.
 */
function getHumanToTimestampViewHtml(styleSheetUri, viewScriptUri) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Human to Timestamp</title>
            <link href="${styleSheetUri}" rel="stylesheet">
        </head>
        <body>
            <div class="container">
                <h1>Human Date to Unix Timestamp</h1>
                <p>Enter a human-readable date and time:</p>
                <div class="input-grid">
                    <div class="input-field-group">
                        <label for="yearInput">Year:</label>
                        <input type="number" id="yearInput" placeholder="YYYY" min="1900" max="2100" class="vscode-input">
                    </div>
                    <div class="input-field-group">
                        <label for="monthInput">Month:</label>
                        <input type="number" id="monthInput" placeholder="MM (1-12)" min="1" max="12" class="vscode-input">
                    </div>
                    <div class="input-field-group">
                        <label for="dayInput">Day:</label>
                        <input type="number" id="dayInput" placeholder="DD (1-31)" min="1" max="31" class="vscode-input">
                    </div>
                    <div class="input-field-group">
                        <label for="hourInput">Hour:</label>
                        <input type="number" id="hourInput" placeholder="HH (0-23)" min="0" max="23" class="vscode-input">
                    </div>
                    <div class="input-field-group">
                        <label for="minuteInput">Minute:</label>
                        <input type="number" id="minuteInput" placeholder="MM (0-59)" min="0" max="59" class="vscode-input">
                    </div>
                    <div class="input-field-group">
                        <label for="secondInput">Second:</label>
                        <input type="number" id="secondInput" placeholder="SS (0-59)" min="0" max="59" class="vscode-input">
                    </div>
                    <div class="input-field-group">
                        <label for="timezoneSelect">Timezone:</label>
                        <select id="timezoneSelect" class="vscode-select">
                            <option value="Local">Local Time</option>
                            <option value="GMT">GMT / UTC</option>
                        </select>
                    </div>
                </div>
                <div class="button-group">
                    <button id="convertHumanToTimestampButton" class="vscode-button">Convert to Timestamp</button>
                </div>
                <div id="humanToTimestampResultDisplay" class="result-box">
                    <p style="color: var(--vscode-input-placeholderForeground);"></p>
                </div>
            </div>

            <script src="${viewScriptUri}"></script>
        </body>
        </html>
    `;
}

module.exports = getHumanToTimestampViewHtml;