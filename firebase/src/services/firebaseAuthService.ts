import "firebase/auth";

import { User, auth } from "firebase/app";
import { Store } from "redoodle";
import { SetCurrentUser } from "../store/actions";
import { IAppState } from "../store/state";
import { FirebaseAnalyticsService } from "./firebaseAnalyticsService";

export type IAuthStateListener = (user: User | undefined) => void;

export class FirebaseAuthService {
    private authStateListeners: Array<IAuthStateListener> = [];

    public constructor(
        private firebaseAuth: auth.Auth,
        private analyticsService: FirebaseAnalyticsService,
        private store: Store<IAppState> | undefined,
    ) {
        this.subscribeToAuthState(this.setUserInStore);
        this.subscribeToAuthState(this.setUserInAnalytics);
        this.firebaseAuth.onAuthStateChanged(this.handleAuthStateChange);
    }

    public authGetCurrentUser = () => this.firebaseAuth.currentUser;

    public authIsLoggedIn = () => this.authGetCurrentUser() != null;

    public authSignOut = () => this.firebaseAuth.signOut();

    private subscribeToAuthState = (authStateListener: IAuthStateListener) => {
        this.authStateListeners.push(authStateListener);
    };

    private handleAuthStateChange = (user: User | null) => {
        const userOrUndefined = user === null ? undefined : user;
        this.setUserInStore(userOrUndefined);
        this.setUserInAnalytics(userOrUndefined);
        this.notifyAuthStateListeners(userOrUndefined);
    };

    private notifyAuthStateListeners = (user: User | undefined) => {
        this.authStateListeners.forEach((authStateListener) => authStateListener(user));
    };

    private setUserInStore = (user: User | undefined) => {
        if (this.store !== undefined) {
            this.store.dispatch(SetCurrentUser.create({ currentUser: user }));
        }
    };

    private setUserInAnalytics = (user: User | undefined) => {
        this.analyticsService.setUserId(user?.uid);
    }
}
