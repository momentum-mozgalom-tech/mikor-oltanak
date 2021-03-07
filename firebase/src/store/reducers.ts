import { TypedReducer, setWith } from "redoodle";
import {
    SetCurrentUser,
    SetHasPendingWrites,
    SetIsLoadingData,
    SetSurgeries,
    SetSurgeryPrivate,
} from "./actions";
import { IAppState } from "./state";

export const appReducer = TypedReducer.builder<IAppState>()
    .withHandler(SetCurrentUser.TYPE, (state, payload) => setWith(state, {
        currentUser: payload.currentUser,
    }))
    .withHandler(SetSurgeries.TYPE, (state, payload) => setWith(state, {
        surgeries: payload.surgeries,
    }))
    .withHandler(SetSurgeryPrivate.TYPE, (state, payload) => setWith(state, {
        surgeryPrivate: payload.surgeryPrivate,
    }))
    .withHandler(SetHasPendingWrites.TYPE, (state, payload) => setWith(state, {
        asyncDataState: setWith(state.asyncDataState, {
            pendingWrites: setWith(state.asyncDataState.pendingWrites, {
                [payload.key]: payload.value,
            }),
        }),
    }))
    .withHandler(SetIsLoadingData.TYPE, (state, payload) => setWith(state, {
        asyncDataState: setWith(state.asyncDataState, {
            dataLoading: setWith(state.asyncDataState.dataLoading, {
                [payload.key]: payload.value,
            }),
        }),
    }))
    .build();
