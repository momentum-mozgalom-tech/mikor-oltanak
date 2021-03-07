import { firestore as firebaseFirestore } from "firebase/app";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useMemo } from "react";
import { getGlobalServices } from "../../services/services";
import {
    SetHasPendingWrites,
} from "../../store/actions";

export function useFirestoreSubscription<API>(
    collectionPath: string,
    onResults: (documents: { [id: string]: API }) => void,
    queryOperation: (query: firebase.firestore.Query) => firebase.firestore.Query = (query) => query,
) {
    const firestore = getGlobalServices()?.firebaseService.getApp().firestore();
    if (firestore === undefined) {
        throw new Error("firestore cannot be undefined here");
    }
    const dispatch = useDispatch();

    const snapshotUnsubscribers: { [key: string]: ((() => void) | undefined) } = useMemo(() => ({
        [collectionPath]: undefined,
    }), [collectionPath]);

    const setPendingWrite = useCallback((key: string, value: boolean) => {
        dispatch(SetHasPendingWrites.create({ key, value }));
    }, [dispatch]);

    const documentSnapshotToObject = <API>(documentSnapshot: firebaseFirestore.DocumentSnapshot) => documentSnapshot.data({ serverTimestamps: "estimate" }) as API;

    const querySnapshotToObjects = useCallback(<API>(querySnapshot: firebaseFirestore.QuerySnapshot) => {
        const objects: { [id: string]: API } = {};
        querySnapshot.forEach((doc) => {
            objects[doc.id] = documentSnapshotToObject(doc);
        });
        return objects;
    }, []);

    const subscribeToCollection = useCallback(<API>(
        collection: string,
        onUpdate: (documents: { [id: string]: API }, hasPendingWrites: boolean) => void,
    ) => {
        const collectionRef = firestore.collection(collection);
        const query = queryOperation(collectionRef);
        return query.onSnapshot(
            { includeMetadataChanges: true },
            (querySnapshot: firebaseFirestore.QuerySnapshot) => {
                const documents = querySnapshotToObjects<API>(querySnapshot);
                const hasPendingWrites = querySnapshot.docs.some((doc) => doc.metadata.hasPendingWrites);
                onUpdate(documents, hasPendingWrites);
            },
        );
    }, [firestore, querySnapshotToObjects, queryOperation]);

    useEffect(() => {
        snapshotUnsubscribers[collectionPath] = subscribeToCollection<API>(
            collectionPath,
            (documents, hasPendingWrites) => {
                setPendingWrite(collectionPath, hasPendingWrites);
                onResults(documents);
            },
        );
        return () => {
            snapshotUnsubscribers[collectionPath]?.();
            snapshotUnsubscribers[collectionPath] = undefined;
        };
    }, [
        collectionPath,
        dispatch,
        onResults,
        setPendingWrite,
        snapshotUnsubscribers,
        subscribeToCollection,
    ]);
}

export function useFirestoreDocSubscription<API>(
    docPath: string,
    onResult: (document: API) => void,
) {
    const firestore = getGlobalServices()?.firebaseService.getApp().firestore();
    if (firestore === undefined) {
        throw new Error("firestore cannot be undefined here");
    }
    const dispatch = useDispatch();

    const snapshotUnsubscribers: { [key: string]: ((() => void) | undefined) } = useMemo(() => ({
        [docPath]: undefined,
    }), [docPath]);

    const setPendingWrite = useCallback((key: string, value: boolean) => {
        dispatch(SetHasPendingWrites.create({ key, value }));
    }, [dispatch]);

    const documentSnapshotToObject = useCallback(
        <API>(documentSnapshot: firebaseFirestore.DocumentSnapshot) => documentSnapshot.data({ serverTimestamps: "estimate" }) as API,
        [],
    );

    const subscribeToDoc = useCallback(<API>(
        doc: string,
        onUpdate: (document: API, hasPendingWrites: boolean) => void,
    ) => {
        const docRef = firestore.doc(doc);
        return docRef.onSnapshot(
            { includeMetadataChanges: true },
            (docSnapshot: firebaseFirestore.DocumentSnapshot) => {
                const document = documentSnapshotToObject<API>(docSnapshot);
                onUpdate(document, docSnapshot.metadata.hasPendingWrites);
            },
        );
    }, [firestore, documentSnapshotToObject]);

    useEffect(() => {
        snapshotUnsubscribers[docPath] = subscribeToDoc<API>(
            docPath,
            (documents, hasPendingWrites) => {
                setPendingWrite(docPath, hasPendingWrites);
                onResult(documents);
            },
        );
        return () => {
            snapshotUnsubscribers[docPath]?.();
            snapshotUnsubscribers[docPath] = undefined;
        };
    }, [
        docPath,
        dispatch,
        onResult,
        setPendingWrite,
        snapshotUnsubscribers,
        subscribeToDoc,
    ]);
}
