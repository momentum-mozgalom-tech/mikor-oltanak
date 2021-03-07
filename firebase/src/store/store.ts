import { StoreEnhancer, createStore, loggingMiddleware } from "redoodle";
import { applyMiddleware } from "redux";
import { appReducer } from "./reducers";
import { IAppState } from "./state";

const initialState: IAppState = {
    surgeries: {},
    surgeryPrivate: undefined,
    currentUser: undefined,
    asyncDataState: {
        pendingWrites: {},
        dataLoading: {},
    },
};

export function createAppStore() {
    const middlewareEnhancer = applyMiddleware(loggingMiddleware()) as unknown as StoreEnhancer;
    return createStore<IAppState>(appReducer, initialState, middlewareEnhancer);
}
