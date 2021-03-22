/** Sanitise the string and return the birthdate in format YYYY-MM-DD */
export function sanitiseBirthdate(value: string) {
    const justDigits = value.replace(/\D/g, "");
    if (justDigits.length !== 8) {
        return undefined;
    }
    const dateIso = `${justDigits.substring(0, 4)}-${justDigits.substring(4, 6)}-${justDigits.substring(6, 8)}`;
    return dateIso;
}

export function dateToString(date: Date) {
    const year = date.getFullYear();
    const month = formatToTwoDigits(date.getMonth() + 1);
    const day = formatToTwoDigits(date.getDate());
    return `${year}-${month}-${day}`;
}

function formatToTwoDigits(value: number) {
    return value.toLocaleString("hu-HU", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
}
