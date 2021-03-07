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

    public addTajHashes = async (params: {
        surgeryId: string;
        tajHashes: string[];
    }) => {
        const { surgeryId, tajHashes } = params;
        await (this.firestore
            .collection(CollectionId.SurgeriesPrivate)
            .doc(surgeryId) as firebaseFirestore.DocumentReference<IFirestoreSurgeryPrivate>)
            .set({
                tajHashes: firebaseFirestore.FieldValue.arrayUnion(...tajHashes) as any,
            }, { merge: true });
    }

    public removeTajHashes = async (params: {
        surgeryId: string;
        tajHashes: string[];
    }) => {
        const { surgeryId, tajHashes } = params;
        await (this.firestore
            .collection(CollectionId.SurgeriesPrivate)
            .doc(surgeryId) as firebaseFirestore.DocumentReference<IFirestoreSurgeryPrivate>)
            .set({
                tajHashes: firebaseFirestore.FieldValue.arrayRemove(...tajHashes) as any,
            }, { merge: true });
    }
}
