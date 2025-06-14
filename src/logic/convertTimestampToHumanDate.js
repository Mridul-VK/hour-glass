/**
 * Converts a Unix timestamp string into human-readable GMT and local date/time formats.
 * Handles timestamps in seconds, milliseconds, microseconds, or nanoseconds.
 *
 * @param {string} inputTimestampValue - The Unix timestamp as a string.
 * @returns {string} HTML string with formatted GMT and local date/time, or an error message.
 */
function convertTimestampToHumanDate(inputTimestampValue) {
    if (!inputTimestampValue) {
        return "<p style='color: var(--vscode-editorWarning-foreground);'>Please enter a timestamp to continue...</p>";
    }

    // Attempt to parse the input as an integer.
    const parsedTimestamp = parseInt(inputTimestampValue);

    if (isNaN(parsedTimestamp)) {
        return "<p style='color: var(--vscode-editorWarning-foreground);'>Please enter a valid numeric timestamp.</p>";
    }

    // Basic validation for common timestamp lengths.
    // Unix timestamps are typically 10 digits for seconds, 13 for milliseconds.
    if (inputTimestampValue.length > 19) {
        return "<p style='color: var(--vscode-editorWarning-foreground);'>Supports Unix timestamps up to nanoseconds (max 19 digits). Please check your input.</p>";
    }

    let detectedTimestampUnit = 'milliseconds'; // Default to milliseconds as Date constructor expects this.

    // Adjust timestamp based on its perceived length to fit milliseconds for Date object.
    // If it's 10 digits (seconds), multiply by 1000 to get milliseconds.
    // If it's more than 13 digits (microseconds/nanoseconds), truncate to milliseconds.
    let adjustedTimestamp = parsedTimestamp;

    if (inputTimestampValue.length <= 10) {
        detectedTimestampUnit = 'seconds';
        adjustedTimestamp *= 1000; // Convert seconds to milliseconds
    } else if (inputTimestampValue.length <= 13) {
        detectedTimestampUnit = 'milliseconds';
        // No adjustment needed, already in milliseconds
    } else if (inputTimestampValue.length <= 16) {
        detectedTimestampUnit = 'microseconds';
        adjustedTimestamp = Math.floor(adjustedTimestamp / 1000); // Convert microseconds to milliseconds
    } else { // Assuming nanoseconds
        detectedTimestampUnit = 'nanoseconds';
        adjustedTimestamp = Math.floor(adjustedTimestamp / 1000000); // Convert nanoseconds to milliseconds
    }

    const convertedDateObject = new Date(adjustedTimestamp);

    // Check for invalid date (e.g., if timestamp is out of Date object's representable range)
    if (isNaN(convertedDateObject.getTime())) {
        return "<p style='color: var(--vscode-editorWarning-foreground);'>The provided timestamp results in an invalid date. Please check its value.</p>";
    }

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Function to pad single-digit numbers with a leading zero
    const pad = (num) => num < 10 ? `0${num}` : num;
    // Function to pad milliseconds with leading zeros
    const padMilliseconds = (ms) => {
        if (ms === 0) return '';
        if (ms < 10) return `.00${ms}`;
        if (ms < 100) return `.0${ms}`;
        return `.${ms}`;
    };

    // Format UTC timestamp
    const formattedUtcDateTime =
        `${dayNames[convertedDateObject.getUTCDay()]}, ` +
        `${monthNames[convertedDateObject.getUTCMonth()]} ${convertedDateObject.getUTCDate()}, ` +
        `${convertedDateObject.getUTCFullYear()} ` +
        `${pad(convertedDateObject.getUTCHours())}:` +
        `${pad(convertedDateObject.getUTCMinutes())}:` +
        `${pad(convertedDateObject.getUTCSeconds())}` +
        `${padMilliseconds(convertedDateObject.getUTCMilliseconds())}`;

    // Format local timestamp
    // toLocaleDateString handles full date formatting including day of week.
    const localTimezoneOffset = convertedDateObject.getTimezoneOffset(); // Difference in minutes between UTC and local time.
    let timezoneOffsetString = '';
    if (localTimezoneOffset !== 0) {
        const offsetHours = Math.floor(Math.abs(localTimezoneOffset) / 60);
        const offsetMinutes = Math.abs(localTimezoneOffset) % 60;
        const sign = localTimezoneOffset > 0 ? '-' : '+'; // If offset is positive, local is behind UTC, so sign is '-'
        timezoneOffsetString = `GMT${sign}${pad(offsetHours)}:${pad(offsetMinutes)}`;
    }


    const formattedLocalDateTime =
        `${convertedDateObject.toLocaleDateString("en-US", { dateStyle: "full" })} ` +
        `${pad(convertedDateObject.getHours())}:` +
        `${pad(convertedDateObject.getMinutes())}:` +
        `${pad(convertedDateObject.getSeconds())}` +
        `${padMilliseconds(convertedDateObject.getMilliseconds())} ` +
        `${timezoneOffsetString}`;


    return `
        <p>Assuming the timestamp is in <b>${detectedTimestampUnit}</b>:</p>
        <p><b>GMT:</b> ${formattedUtcDateTime} UTC</p>
        <p><b>Your time zone:</b> ${formattedLocalDateTime}</p>
    `;
}

module.exports = convertTimestampToHumanDate;