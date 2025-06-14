const vscode = require('vscode');
const getTimestampToHumanViewHtml = require('../views/timestampToHumanView');
const convertTimestampToHumanDate = require('../logic/convertTimestampToHumanDate');

/**
 * @typedef {import('vscode').ExtensionContext} ExtensionContext
 * @typedef {import('vscode').WebviewView} WebviewView
 * @typedef {import('vscode').Webview} Webview
 */

/**
 * Manages the webview for converting Unix timestamps to human-readable dates.
 */
class TimestampToHumanProvider {
    /** @type {WebviewView | undefined} */
    _webviewView;
    /** @type {vscode.Uri} */
    _extensionBaseUri; // Base URI for the extension, used to get resource URIs for the webview.

    /**
     * @param {ExtensionContext} context - The extension context.
     */
    constructor(context) {
        this._extensionBaseUri = context.extensionUri;
    }

    /**
     * Resolves the webview view, sets its options, and loads its HTML content.
     * It also sets up message listeners for communication between the webview and the extension.
     *
     * @param {WebviewView} webviewView - The webview view instance.
     * @param {vscode.WebviewViewResolveContext} context - Additional context.
     * @param {vscode.CancellationToken} _token - A cancellation token.
     */
    resolveWebviewView(webviewView, context, _token) {
        this._webviewView = webviewView;

        webviewView.webview.options = {
            enableScripts: true, // Allow JavaScript in the webview.
            localResourceRoots: [this._extensionBaseUri] // Restrict content loading to the extension's base URI.
        };

        // Get URIs for shared CSS and specific JavaScript.
        const styleSheetUri = webviewView.webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionBaseUri, 'media', 'style.css')
        );
        const viewScriptUri = webviewView.webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionBaseUri, 'media', 'timestampToHumanScript.js')
        );

        // Set the webview's HTML content.
        webviewView.webview.html = getTimestampToHumanViewHtml(styleSheetUri, viewScriptUri);

        // Listen for messages coming from the webview.
        webviewView.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'submitTimestampText': // Command to convert a timestamp.
                    const convertedDateTimeContent = convertTimestampToHumanDate(message.text);
                    // Send the converted content back to the webview to update the display.
                    this._webviewView.webview.postMessage({
                        command: 'updateTimestampResult',
                        content: convertedDateTimeContent
                    });
                    return;
            }
        });
    }
}

module.exports = TimestampToHumanProvider;