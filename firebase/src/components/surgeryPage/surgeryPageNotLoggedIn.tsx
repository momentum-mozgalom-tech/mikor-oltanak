import {
    Button,
    Grid, Typography,
} from "@material-ui/core";
import styled from "styled-components/macro";
import * as React from "react";
import { NavUtils, Page } from "../../utils/navUtils";
import { Login } from "../general/login";

export function SurgeryPageNotLoggedIn() {
    return (
        <Grid container spacing={5} direction="column" alignItems="center">
            <Grid item xs={12} md={6}>
                <Title variant="h2" align="center" gutterBottom>Háziorvosoknak / rendelőknek</Title>
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Typography variant="body1" paragraph>
                    Háziorvosok/rendelők ezen a lapon állíthatják be,
                    hogy mely születési dátumok szerepelnek az oltási listájukon.
                </Typography>
                <Typography variant="body1" paragraph>
                    Ha már regisztrált ezen a honlapon, lépjen be alább.
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Login redirectUrl={NavUtils.getNavUrl[Page.Rendelo]()} />
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Typography variant="body1" paragraph>
                    Ha még nem regisztrált, akkor azt az alábbi gombra kattintva teheti meg.
                    Igyekszünk minél hamarabb válaszolni!
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Button color="primary" variant="contained" href="https://docs.google.com/forms/d/e/1FAIpQLSeL0p2n5BH5xMGdPTLSlhFG1Q3uF4ewiKCUGUzV1-80FDu41A/viewform?usp=sf_link" target="_blank" rel="noreferrer">
                    Regisztrálok háziorvosként/rendelőként
                </Button>
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Typography variant="body1" paragraph>
                    Adatvédelmi szempontból a rendszer jogilag megfelelő és biztonságos.
                    A páciensek semmilyen személyes adatát nem tároljuk, kizárólag a születési
                    dátumokat. Habár a születési dátumok nem rendelhetőek egyértelműen páciensekhez,
                    sok esetben így is megspórolhat néhány felesleges telefonhívást a rendszer
                    használata.
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Typography variant="body1" paragraph>
                    Kérdéseit küldje az info@mikoroltanak.eu címre!
                </Typography>
            </Grid>
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
