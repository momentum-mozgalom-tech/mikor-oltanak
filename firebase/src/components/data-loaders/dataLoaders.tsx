import { useDispatch } from "react-redux";
import {
    CollectionId, IFirestoreSurgery,
} from "@mikoroltanak/api";
import {
    SetSurgeries,
} from "../../store/actions";
import { useFirestoreSubscription } from "./useFirestoreSubscription";

export function DataLoaders() {
    const dispatch = useDispatch();

    useFirestoreSubscription<IFirestoreSurgery>(
        CollectionId.Surgeries,
        (documents) => {
            dispatch(SetSurgeries.create({ surgeries: documents }));
        },
    );

    return null;
}
