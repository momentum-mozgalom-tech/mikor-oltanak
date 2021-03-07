import {
    IFirestoreSurgery,
    IFirestoreSurgeryPrivate,
} from "@mikoroltanak/api";
import { IUser } from "../commons";

export interface IAppState {
    surgeries: ISurgeriesState;
    surgeryPrivate: IFirestoreSurgeryPrivate | undefined;
    currentUser: IUser | undefined;
    asyncDataState: {
        /** True for IDs for which there is an ongoing firestore update */
        pendingWrites: IMapState<boolean>;
        /** True for IDs for which we have an outstanding async fetch */
        dataLoading: IMapState<boolean>;
    }
}

export type ISurgeriesState = IMapState<IFirestoreSurgery>;

interface IMapState<T> {
    [id: string]: T;
}
