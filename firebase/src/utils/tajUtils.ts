import { sha256 } from "js-sha256";

export function createTajHash(taj: string) {
    return sha256(taj);
}

/** Keeps just digits */
export function sanitiseTaj(value: string) {
    return value.replace(/\D/g, "");
}

export function checkTaj(sanitisedTaj: string) {
    return sanitisedTaj.length === 9;
}
