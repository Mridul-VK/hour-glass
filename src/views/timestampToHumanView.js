/**
 * @typedef {import('vscode').Uri} Uri
 */

/**
 * Generates the HTML content for the Unix timestamp to human-readable date converter webview.
 * Includes basic structure, input fields, and links to CSS and JavaScript assets.
 *
 * @param {Uri} styleSheetUri - The URI for the shared CSS stylesheet.
 * @param {Uri} viewScriptUri - The URI for the view-specific JavaScript script.
 * @returns {string} The full HTML string for the webview.
 */
function getTimestampToHumanViewHtml(styleSheetUri, viewScriptUri) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Timestamp to Human</title>
            <link href="${styleSheetUri}" rel="stylesheet">
        </head>
        <body>
            <div class="container">
                <h1>Unix Timestamp to Human Date</h1>
                <p>Enter a Unix timestamp (seconds, milliseconds, microseconds, or nanoseconds):</p>
                <div class="input-group">
                    <input type="text" id="timestampInput" placeholder="e.g., 1678886400000" class="vscode-input">
                    <button id="convertTimestampButton" class="vscode-button">Convert</button>
                </div>
                <div id="timestampResultDisplay" class="result-box">
                    <p style="color: var(--vscode-input-placeholderForeground);"></p>
                </div>
            </div>

            <script src="${viewScriptUri}"></script>
        </body>
        </html>
    `;
}

module.exports = getTimestampToHumanViewHtml;