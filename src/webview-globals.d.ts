// src/webview-globals.d.ts
/**
 * Declares the global acquireVsCodeApi function available within VS Code webviews.
 * This allows webview scripts to communicate with the VS Code extension host.
 */
declare function acquireVsCodeApi(): {
    /**
     * Post a message to the extension host.
     *
     * @param message The message to send.
     */
    postMessage(message: any): void;

    /**
     * Set the webview's state.
     *
     * @param newState The new state. This must be a JSON-serializable object.
     */
    setState(newState: any): void;

    /**
     * Get the webview's current state.
     *
     * @returns The current state, or `undefined` if no state has been set.
     */
    getState(): any;
};