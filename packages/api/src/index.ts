export enum CollectionId {
    /** Public surgery information */
    Surgeries = "surgeries",
    /** Private surgery information */
    SurgeriesPrivate = "surgeries-private",
    /** Request tracker */
    Requests = "requests",
    Requests_Ips = "ips",
}

export interface IFirestoreSurgery {
    name: string;
    description: string;
    phone?: string;
    /** Possibly different from the user's registration email because this is public */
    email?: string;
    location?: string;
}

export interface IFirestoreSurgeryPrivate {
    /** A list of birthdates, where birthdates are of the format 1990-12-31 */
    birthdates: string[];
}

export interface IFirestoreRequestIp {
    /** The number of requests made from a given IP on a given day */
    numberOfSearchRequests: number;
}

export interface IFunctionsSearchRequest {
    /** Birthdate in the format of 1990-12-31 */
    birthdate: string;
}

export interface IFunctionsSearchResponse {
    /** Surgeries matching the search request */
    surgeryIds: string[];
}
