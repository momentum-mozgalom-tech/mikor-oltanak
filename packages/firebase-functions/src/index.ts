import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {
    CollectionId,
    IFirestoreRequestIp,
    IFirestoreSurgery,
    IFirestoreSurgeryPrivate,
    IFunctionsSearchRequest,
    IFunctionsSearchResponse,
} from "@mikoroltanak/api";

admin.initializeApp(functions.config().firebase);

const MAX_NUMBER_OF_SEARCH_REQUESTS_PER_DAY_PER_IP = 10;

/**
 * Search for surgeries containing the given patient.
 */
export const findPatient = functions
    .region("europe-west1")
    .https
    .onCall(async (data: IFunctionsSearchRequest, context): Promise<IFunctionsSearchResponse> => {
        const isLoggedIn = context.auth?.uid !== undefined;
        const isRequestLimitOk = await checkAndIncrementSearchRequestCount(context.rawRequest.ip);
        if (!isLoggedIn && !isRequestLimitOk) {
            throw new functions.https.HttpsError("resource-exhausted", "Ma már nem futtathat le több keresést.");
        }
        const { birthdate } = data;
        const matchingSurgeries = await admin.firestore().collection(CollectionId.SurgeriesPrivate).where("birthdates", "array-contains", birthdate).get();
        const matchingSurgeryIds = matchingSurgeries.docs.map(doc => doc.id);
        return { surgeryIds: matchingSurgeryIds };
    });

/**
 * Returns true if the number of search requests hasn't exceeded the maximum.
 */
const checkAndIncrementSearchRequestCount = async (ip: string) => {
    // Of the format "2021-03-07"
    const day = new Date().toISOString().substring(0, 10);
    const requestCounterDoc = admin.firestore()
        .collection(CollectionId.Requests)
        .doc(day)
        .collection(CollectionId.Requests_Ips)
        .doc(ip) as FirebaseFirestore.DocumentReference<IFirestoreRequestIp>;
    const numberOfSearchRequests = (await requestCounterDoc.get()).data()?.numberOfSearchRequests ?? 0;
    if (numberOfSearchRequests >= MAX_NUMBER_OF_SEARCH_REQUESTS_PER_DAY_PER_IP) {
        return false;
    }
    await requestCounterDoc.set({
        numberOfSearchRequests: admin.firestore.FieldValue.increment(1) as any,
    }, { merge: true });
    return true;
};

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
            birthdates: [],
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
