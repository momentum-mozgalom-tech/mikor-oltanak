import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {
    CollectionId,
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
