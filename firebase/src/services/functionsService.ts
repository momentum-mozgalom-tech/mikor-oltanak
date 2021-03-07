import "firebase/functions";

import { app } from "firebase/app";
import {
    IFunctionsSearchRequest,
    IFunctionsSearchResponse,
} from "@mikoroltanak/api";

export class FunctionsService {
    public findPatient = async (request: IFunctionsSearchRequest) => {
        const remoteFunction = this.getFunctions().httpsCallable("findPatient");
        const result = await remoteFunction(request);
        return result.data as IFunctionsSearchResponse;
    };

    private getFunctions = () => {
        const defaultApp = app();
        return defaultApp.functions("europe-west1");
    };
}
