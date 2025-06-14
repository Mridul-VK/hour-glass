/**
 * @typedef {object} DateFields
 * @property {string} year - The year as a string.
 * @property {string} month - The month (1-12) as a string.
 * @property {string} day - The day (1-31) as a string.
 * @property {string} hour - The hour (0-23) as a string.
 * @property {string} minute - The minute (0-59) as a string.
 * @property {string} second - The second (0-59) as a string.
 * @property {'GMT' | 'Local'} timezone - The selected timezone ('GMT' or 'Local').
 */

/**
 * Converts human-readable date and time fields into Unix timestamps (seconds and milliseconds).
 *
 * @param {DateFields} dateFields - An object containing year, month, day, hour, minute, second, and timezone.
 * @returns {string} HTML string with Unix timestamps, or an error message.
 */
function convertHumanToTimestamp(dateFields) {
    const { year, month, day, hour, minute, second, timezone } = dateFields;

    // --- Input Validation ---
    if (!year || !month || !day || !hour || !minute || !second || !timezone) {
        return "<p style='color: var(--vscode-editorWarning-foreground);'>Please fill in all date and time fields to convert.</p>";
    }

    const yearInt = parseInt(year);
    const monthInt = parseInt(month);   // Month is 1-indexed from input (e.g., January is 1)
    const dayInt = parseInt(day);
    const hourInt = parseInt(hour);
    const minuteInt = parseInt(minute);
    const secondInt = parseInt(second);

    // Check for valid number parsing
    if (isNaN(yearInt) || isNaN(monthInt) || isNaN(dayInt) ||
        isNaN(hourInt) || isNaN(minuteInt) || isNaN(secondInt)) {
        return "<p style='color: var(--vscode-editorWarning-foreground);'>Invalid input: All date/time fields must be numeric.</p>";
    }

    // Validate ranges
    if (yearInt < 1900 || yearInt > 2100) return "<p style='color: var(--vscode-editorWarning-foreground);'>Invalid Year: Must be between 1900 and 2100.</p>";
    if (monthInt < 1 || monthInt > 12) return "<p style='color: var(--vscode-editorWarning-foreground);'>Invalid Month: Must be between 1 and 12.</p>";
    if (dayInt < 1 || dayInt > 31) return "<p style='color: var(--vscode-editorWarning-foreground);'>Invalid Day: Must be between 1 and 31.</p>";
    if (hourInt < 0 || hourInt > 23) return "<p style='color: var(--vscode-editorWarning-foreground);'>Invalid Hour: Must be between 0 and 23.</p>";
    if (minuteInt < 0 || minuteInt > 59) return "<p style='color: var(--vscode-editorWarning-foreground);'>Invalid Minute: Must be between 0 and 59.</p>";
    if (secondInt < 0 || secondInt > 59) return "<p style='color: var(--vscode-editorWarning-foreground);'>Invalid Second: Must be between 0 and 59.</p>";

    let dateObject;
    // Month in Date constructor is 0-indexed (January is 0, December is 11)
    const jsMonth = monthInt - 1;

    // --- Date Object Creation ---
    if (timezone === 'GMT') {
        // Create Date object in UTC
        dateObject = new Date(Date.UTC(yearInt, jsMonth, dayInt, hourInt, minuteInt, secondInt));
    } else { // 'Local'
        // Create Date object in local time
        dateObject = new Date(yearInt, jsMonth, dayInt, hourInt, minuteInt, secondInt);
    }

    // --- Final Date Validity Check ---
    // JavaScript's Date object automatically corrects invalid dates (e.g., Feb 30 becomes Mar 2).
    // We check if the corrected date matches the input to catch invalid combinations.
    if (isNaN(dateObject.getTime()) ||
        dateObject.getFullYear() !== yearInt ||
        dateObject.getMonth() !== jsMonth ||
        dateObject.getDate() !== dayInt
    ) {
        return "<p style='color: var(--vscode-editorWarning-foreground);'>Invalid date combination entered. For example, February 30th is not a valid date. Please recheck your inputs.</p>";
    }

    // --- Conversion to Unix Timestamps ---
    const unixTimestampMilliseconds = dateObject.getTime(); // Returns milliseconds since epoch
    const unixTimestampSeconds = Math.floor(unixTimestampMilliseconds / 1000); // Convert to seconds

    return `
        <p><b>Unix Timestamp (Seconds):</b> ${unixTimestampSeconds}</p>
        <p><b>Unix Timestamp (Milliseconds):</b> ${unixTimestampMilliseconds}</p>
    `;
}

module.exports = convertHumanToTimestamp;