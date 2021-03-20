import { IFirestoreSurgery } from "@mikoroltanak/api";
import React from "react";

export const surgeryValidator = (
    surgeryBefore: IFirestoreSurgery | undefined,
    surgeryAfter: IFirestoreSurgery,
): boolean => {
    if (!surgeryBefore) {
        return true;
    }
    const entries = Object.entries(surgeryBefore) as [keyof IFirestoreSurgery, string][];

    return entries.some(([key, value]) => surgeryAfter[key] !== (value ?? ""));
};

export function useChangeHandler(setterFn: React.Dispatch<string>) {
    return React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setterFn((event.target.value));
        },
        [setterFn],
    );
}
