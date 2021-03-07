import { useDispatch } from "react-redux";
import {
    CollectionId, IFirestoreSurgery,
} from "@mikoroltanak/api";
import { useCallback } from "react";
import {
    SetSurgeries,
} from "../../store/actions";
import { useFirestoreSubscription } from "./useFirestoreSubscription";

export function DataLoaders() {
    const dispatch = useDispatch();

    useFirestoreSubscription<IFirestoreSurgery>(
        CollectionId.Surgeries,
        useCallback((documents) => {
            dispatch(SetSurgeries.create({ surgeries: documents }));
        }, [dispatch]),
    );

    return null;
}
