/** Parse the string and return the birthdate in format YYYY-MM-DD */
export function sanitiseBirthdate(value: string) {
    const timestamp = Date.parse(value);
    return Number.isNaN(timestamp) ? undefined : dateToString(new Date(timestamp));
}

export function dateToString(date: Date) {
    return date.toISOString().substring(0, 10);
}
