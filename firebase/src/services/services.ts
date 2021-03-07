import { Store } from "redoodle";
import { IAppState } from "../store/state";
import { DataService } from "./dataService";
import { FirebaseAnalyticsService } from "./firebaseAnalyticsService";
import { FirebaseAuthService } from "./firebaseAuthService";
import { FirebaseAuthUiService } from "./firebaseAuthUiService";
import { FirebaseService } from "./firebaseService";
import { FirestoreService } from "./firestoreService";
import { FunctionsService } from "./functionsService";

export type IGlobalServices = ReturnType<typeof getServices>;

function getServices(store: Store<IAppState> | undefined) {
    const firebaseService = new FirebaseService();
    const firebaseAnalyticsService = new FirebaseAnalyticsService(firebaseService.getApp());
    const firebaseAuthService = new FirebaseAuthService(
        firebaseService.getApp().auth(),
        firebaseAnalyticsService,
        store,
    );
    const firebaseAuthUiService = new FirebaseAuthUiService(store, firebaseAnalyticsService);
    const firestoreService = new FirestoreService(firebaseService.getApp().firestore());
    const dataService = new DataService(firebaseService.getApp().firestore());
    const functionsService = new FunctionsService();

    return {
        firebaseService,
        firebaseAnalyticsService,
        firebaseAuthService,
        firebaseAuthUiService,
        firestoreService,
        dataService,
        functionsService,
    };
}

let GLOBAL_SERVICES: IGlobalServices | undefined;

export function getGlobalServices() {
    return GLOBAL_SERVICES;
}

export function initializeAndGetClientSideServices(store: Store<IAppState>) {
    GLOBAL_SERVICES = getServices(store);
    return GLOBAL_SERVICES;
}
