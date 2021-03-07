import { app, initializeApp } from "firebase/app";
import "firebase/auth";
import { result as firebaseConfig } from "../environment/firebase-config.json";

export class FirebaseService {
    private firebaseApp: app.App;

    public constructor() {
        this.firebaseApp = initializeApp(firebaseConfig);
    }

    public getApp = () => this.firebaseApp;
}
