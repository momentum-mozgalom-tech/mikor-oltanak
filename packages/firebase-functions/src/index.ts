import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {
    CollectionId,
    IFirestoreSurgery,
    IFirestoreSurgeryPrivate,
    IFunctionsSearchRequest,
    IFunctionsSearchResponse,
} from "@mikoroltanak/api";

admin.initializeApp(functions.config().firebase);

/**
 * Search for surgeries containing the given patient.
 */
export const findPatient = functions
    .region("europe-west1")
    .https
    .onCall(async (data: IFunctionsSearchRequest, _context): Promise<IFunctionsSearchResponse> => {
        const { tajHash } = data;
        const matchingSurgeries = await admin.firestore().collection(CollectionId.SurgeriesPrivate).where("tajHashes", "array-contains", tajHash).get();
        const matchingSurgeryIds = matchingSurgeries.docs.map(doc => doc.id);
        return { surgeryIds: matchingSurgeryIds };
    });

export const onUserCreate = functions
    .region("europe-west1")
    .auth
    .user()
    .onCreate(async (user) => {
        const surgeryId = user.uid;
        const surgeryDoc = admin.firestore().collection(CollectionId.Surgeries).doc(surgeryId) as FirebaseFirestore.DocumentReference<IFirestoreSurgery>;
        await surgeryDoc.set({
            name: "",
            description: "",
        });
        const surgeryPrivateDoc = admin.firestore().collection(CollectionId.SurgeriesPrivate).doc(surgeryId) as FirebaseFirestore.DocumentReference<IFirestoreSurgeryPrivate>;
        await surgeryPrivateDoc.set({
            tajHashes: [],
        });
    });

export const onUserDelete = functions
    .region("europe-west1")
    .auth
    .user()
    .onDelete(async (user) => {
        const surgeryId = user.uid;
        const surgeryDoc = admin.firestore().collection(CollectionId.Surgeries).doc(surgeryId) as FirebaseFirestore.DocumentReference<IFirestoreSurgery>;
        await surgeryDoc.delete();
        const surgeryPrivateDoc = admin.firestore().collection(CollectionId.SurgeriesPrivate).doc(surgeryId) as FirebaseFirestore.DocumentReference<IFirestoreSurgeryPrivate>;
        await surgeryPrivateDoc.delete();
    });
