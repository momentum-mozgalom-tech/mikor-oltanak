import { User } from "firebase/app";
import { createSelector } from "reselect";
import { IAppState } from "./state";

const selectPendingWrites = (state: IAppState) => state.asyncDataState.pendingWrites;

const selectDataLoading = (state: IAppState) => state.asyncDataState.dataLoading;

export const selectHasPendingWrites = createSelector(
    selectPendingWrites,
    (pendingWrites) => Object.values(pendingWrites).some((value) => value),
);

export const selectIsLoadingData = createSelector(
    selectDataLoading,
    (dataLoading) => Object.values(dataLoading).some((value) => value),
);

export const selectCurrentUser = (state: IAppState) => state.currentUser;

export const selectCurrentUserId = createSelector(
    selectCurrentUser,
    (user: User | undefined) => (user === undefined ? undefined : user.uid),
);

export const selectSurgeries = (
    state: IAppState,
) => state.surgeries;

export const selectSurgeryPrivate = (
    state: IAppState,
) => state.surgeryPrivate;
