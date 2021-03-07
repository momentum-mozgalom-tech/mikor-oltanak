import { app } from "firebase/app";
import "firebase/analytics";

export class FirebaseAnalyticsService {
    private analytics = this.firebaseApp.analytics();

    public constructor(private firebaseApp: app.App) {}

    public setUserId = (userId: string | undefined) => {
        // Set as user property
        this.analytics.setUserProperties({ userId: userId ?? null });
        // Set also as analytics user ID
        if (userId === undefined) {
            // We can't unset the user ID on analytics
            return;
        }
        this.analytics.setUserId(userId);
    }

    public logLogin = (props: { method: "email"; }) => {
        this.analytics.logEvent("login", props);
    }

    public logPageView = () => {
        this.analytics.logEvent("page_view", {
            page_location: window.location.href,
            page_path: window.location.pathname,
        });
    }
}
