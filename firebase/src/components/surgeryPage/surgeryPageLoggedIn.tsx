import {
    Grid, Typography,
} from "@material-ui/core";
import styled from "styled-components/macro";
import { CollectionId, IFirestoreSurgeryPrivate } from "@mikoroltanak/api";
import * as React from "react";
import { useFirestoreDocSubscription } from "../data-loaders/useFirestoreSubscription";
import { SurgeryPagePrivateInfo } from "./surgeryPagePrivateInfo";
import { SurgeryPagePublicInfo } from "./surgeryPagePublicInfo";

export function SurgeryPageLoggedIn({ surgeryId }: { surgeryId: string }) {
    const [surgeryPrivate, setSurgeryPrivate] = React.useState<IFirestoreSurgeryPrivate>();
    useFirestoreDocSubscription<IFirestoreSurgeryPrivate>(
        `${CollectionId.SurgeriesPrivate}/${surgeryId}`,
        setSurgeryPrivate,
    );

    return (
        <Grid container spacing={5} direction="column" alignItems="center">
            <Grid item xs={12} md={6}>
                <Title variant="h2" align="center" gutterBottom>Háziorvosoknak / rendelőknek</Title>
            </Grid>
            <SurgeryPagePublicInfo surgeryId={surgeryId} />
            {surgeryPrivate && <SurgeryPagePrivateInfo surgeryId={surgeryId} surgeryPrivate={surgeryPrivate} />}
        </Grid>
    );
}

// Styles
const Title = styled(Typography)`
    ${({ theme }) => `
        ${theme.breakpoints.down("xs")} {
            font-size: 2rem;
        }
    `}
`;
