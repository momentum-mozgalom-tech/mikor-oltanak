import "firebase/auth";
import "firebaseui/dist/firebaseui.css";

import { User, auth } from "firebase/app";
import * as firebaseui from "firebaseui";
import { Store } from "redoodle";
import { SetCurrentUser } from "../store/actions";
import { IAppState } from "../store/state";
import { NavUtils, Page } from "../utils/navUtils";
import { FirebaseAnalyticsService } from "./firebaseAnalyticsService";

export class FirebaseAuthUiService {
    private firebaseAuthUi: firebaseui.auth.AuthUI | undefined;

    private defaultFirebaseAuthUiConfig: firebaseui.auth.Config = {
        signInSuccessUrl: NavUtils.getNavUrl[Page.Kezdolap](),
        signInOptions: [auth.EmailAuthProvider.PROVIDER_ID],
        // tosUrl: "/felhasznalasi-feltetelek",
        privacyPolicyUrl: "/assets/mikoroltanak_adatkezelesi_20210319.pdf",
        callbacks: {
            signInSuccessWithAuthResult: (authResult: any) => {
                this.setUser(authResult.user);
                this.analyticsService.logLogin({ method: "email" });
                // Do not redirect.
                return true;
            },
        },
        popupMode: true,
    };

    public constructor(
        private store: Store<IAppState> | undefined,
        private analyticsService: FirebaseAnalyticsService,
    ) {
        this.firebaseAuthUi = firebaseui === undefined ? undefined : new firebaseui.auth.AuthUI(auth());
    }

    public authStart = (element: string | Element, signInSuccessUrl: string | undefined) => {
        this.firebaseAuthUi?.start(element, this.getFirebaseAuthUiConfig(signInSuccessUrl));
    };

    private setUser = (user: User | null) => {
        const userOrUndefined = user === null ? undefined : user;
        if (this.store !== undefined) {
            this.store.dispatch(SetCurrentUser.create({ currentUser: userOrUndefined }));
        }
    };

    private getFirebaseAuthUiConfig = (signInSuccessUrl?: string) => (
        signInSuccessUrl === undefined ? this.defaultFirebaseAuthUiConfig : {
            ...this.defaultFirebaseAuthUiConfig,
            signInSuccessUrl,
        }
    );
}
