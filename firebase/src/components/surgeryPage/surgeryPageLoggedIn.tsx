import {
    Grid, Typography,
} from "@material-ui/core";
import { CollectionId, IFirestoreSurgeryPrivate } from "@mikoroltanak/api";
import * as React from "react";
import { useFirestoreDocSubscription } from "../data-loaders/useFirestoreSubscription";
import { SurgeryPagePrivateInfo } from "./surgeryPagePrivateInfo";
import { SurgeryPagePublicInfo } from "./surgeryPagePublicInfo";

export function SurgeryPageLoggedIn({ surgeryId }: { surgeryId: string }) {
    const [surgeryPrivate, setSurgeryPrivate] = React.useState<IFirestoreSurgeryPrivate>();
    useFirestoreDocSubscription<IFirestoreSurgeryPrivate>(
        `${CollectionId.SurgeriesPrivate}/${surgeryId}`,
        (document) => {
            setSurgeryPrivate(document);
        },
    );

    return (
        <Grid container spacing={5} direction="column" alignItems="center">
            <Grid item xs={12} md={6}>
                <Typography variant="h2" gutterBottom>Rendelő</Typography>
            </Grid>
            <SurgeryPagePublicInfo surgeryId={surgeryId} />
            {surgeryPrivate && <SurgeryPagePrivateInfo surgeryId={surgeryId} surgeryPrivate={surgeryPrivate} />}
        </Grid>
    );
}
