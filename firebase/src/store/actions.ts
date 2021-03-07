import { IFirestoreSurgeryPrivate } from "@mikoroltanak/api";
import { TypedAction } from "redoodle";
import { IUser } from "../commons";
import {
    ISurgeriesState,
} from "./state";

export const SetCurrentUser = TypedAction.define("MIKOR_OLTANAK//SET_CURRENT_USER")<{
    currentUser: IUser | undefined;
}>();

export const SetSurgeries = TypedAction.define("MIKOR_OLTANAK//SET_SURGERIES")<{
    surgeries: ISurgeriesState;
}>();

export const SetSurgeryPrivate = TypedAction.define("MIKOR_OLTANAK//SET_SURGERY_PRIVATE")<{
    surgeryPrivate: IFirestoreSurgeryPrivate | undefined;
}>();

export const SetHasPendingWrites = TypedAction.define("MIKOR_OLTANAK//SET_HAS_PENDING_WRITES")<{
    key: string;
    value: boolean;
}>();

export const SetIsLoadingData = TypedAction.define("MIKOR_OLTANAK//SET_IS_LOADING_DATA")<{
    key: string;
    value: boolean;
}>();
