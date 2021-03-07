import "firebase/firestore";

export class FirestoreService {
    public constructor(firestore: firebase.firestore.Firestore) {
        const settings = {
            ignoreUndefinedProperties: true,
        };
        firestore.settings(settings);
        firestore.enablePersistence().catch(() => {});
    }
}
