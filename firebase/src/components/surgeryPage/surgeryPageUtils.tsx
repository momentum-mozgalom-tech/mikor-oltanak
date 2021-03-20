import { IFirestoreSurgery } from "@mikoroltanak/api";
import React from "react";

export const surgeryValidator = (surgery: IFirestoreSurgery | undefined ,validatorObj: IFirestoreSurgery): boolean => {
    if(!surgery) {
        return true;
    }
    const entries = Object.entries(surgery) as [keyof IFirestoreSurgery, string][];

    return entries.some(([key,value]) => validatorObj[key] !== (value ?? ""));
}

export function useChangeHandler(setterFn: React.Dispatch<string>) {
    return React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setterFn((event.target.value));
        },
        [setterFn]
    );
}
