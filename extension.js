const vscode = require('vscode');
const TimestampToHumanProvider = require('./src/providers/timestampToHumanProvider');
const HumanToTimestampProvider = require('./src/providers/humanToTimestampProvider');

/**
 * @typedef {import('vscode').ExtensionContext} ExtensionContext
 */

/**
 * Activates the 'Hour Glass' VS Code extension.
 * This function is called when the extension is activated.
 * It registers the webview view providers for both timestamp conversion functionalities.
 *
 * @param {ExtensionContext} context - The extension context provided by VS Code.
 */
function activate(context) {
	console.log('Congratulations, your extension "hour-glass" is now active!');

	// Register the WebviewViewProvider for converting Unix timestamp to human-readable date.
	// The 'timestamp-to-human' ID must match the view ID declared in package.json.
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			'timestamp-to-human',
			new TimestampToHumanProvider(context)
		)
	);

	// Register the WebviewViewProvider for converting human-readable date to Unix timestamp.
	// The 'human-to-timestamp' ID must match the new view ID declared in package.json.
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			'human-to-timestamp',
			new HumanToTimestampProvider(context)
		)
	);

	// Register a simple command for demonstration (e.g., 'Hello World').
	const helloWorldCommand = vscode.commands.registerCommand('hour-glass.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from Hour Glass!');
	});

	context.subscriptions.push(helloWorldCommand);
}

/**
 * Deactivates the 'Hour Glass' VS Code extension.
 * This function is called when the extension is deactivated.
 */
function deactivate() {
	// Any cleanup logic can go here if needed.
	console.log('Hour Glass extension is now deactivated.');
}

module.exports = {
	activate,
	deactivate
};