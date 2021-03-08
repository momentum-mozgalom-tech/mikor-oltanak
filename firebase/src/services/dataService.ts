import { firestore as firebaseFirestore } from "firebase/app";
import {
    CollectionId, IFirestoreSurgery, IFirestoreSurgeryPrivate,
} from "@mikoroltanak/api";

export class DataService {
    public constructor(private firestore: firebaseFirestore.Firestore) {}

    public updateSurgery = async (params: {
        surgeryId: string;
        surgery: IFirestoreSurgery;
    }) => {
        const {
            surgeryId, surgery,
        } = params;
        await (this.firestore
            .collection(CollectionId.Surgeries)
            .doc(surgeryId) as firebaseFirestore.DocumentReference<IFirestoreSurgery>)
            .set(surgery);
    }

    public addBirthdates = async (params: {
        surgeryId: string;
        birthdates: string[];
    }) => {
        const { surgeryId, birthdates } = params;
        await (this.firestore
            .collection(CollectionId.SurgeriesPrivate)
            .doc(surgeryId) as firebaseFirestore.DocumentReference<IFirestoreSurgeryPrivate>)
            .set({
                birthdates: firebaseFirestore.FieldValue.arrayUnion(...birthdates) as any,
            }, { merge: true });
    }

    public removeBirthdates = async (params: {
        surgeryId: string;
        birthdates: string[];
    }) => {
        const { surgeryId, birthdates } = params;
        await (this.firestore
            .collection(CollectionId.SurgeriesPrivate)
            .doc(surgeryId) as firebaseFirestore.DocumentReference<IFirestoreSurgeryPrivate>)
            .set({
                birthdates: firebaseFirestore.FieldValue.arrayRemove(...birthdates) as any,
            }, { merge: true });
    }

    public removeAllBirthdates = async (params: {
        surgeryId: string;
    }) => {
        const { surgeryId } = params;
        await (this.firestore
            .collection(CollectionId.SurgeriesPrivate)
            .doc(surgeryId) as firebaseFirestore.DocumentReference<IFirestoreSurgeryPrivate>)
            .set({
                birthdates: [],
            }, { merge: true });
    }
}
