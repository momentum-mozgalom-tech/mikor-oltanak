import {
    Button,
    Grid, Typography,
} from "@material-ui/core";
import * as React from "react";
import { NavUtils, Page } from "../../utils/navUtils";
import { Login } from "../general/login";

export function SurgeryPageNotLoggedIn() {
    return (
        <Grid container spacing={5} direction="column" alignItems="center">
            <Grid item xs={12} md={6}>
                <Typography variant="h2" gutterBottom>Háziorvosoknak/rendelőknek</Typography>
            </Grid>
            <Grid item xs={12} md={6} direction="column" alignItems="stretch">
                <Typography variant="body1" paragraph>
                    Háziorvosok/rendelők ezen a lapon állíthatják be,
                    hogy mely páciensek szerepelnek az oltási listájukon.
                </Typography>
                <Typography variant="body1" paragraph>
                    Ha már regisztrált ezen a honlapon, lépjen be alább.
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Login redirectUrl={NavUtils.getNavUrl[Page.Rendelo]()} />
            </Grid>
            <Grid item xs={12} md={6} direction="column" alignItems="stretch">
                <Typography variant="body1" paragraph>
                    Ha még nem regisztrált, akkor azt az alábbi gombra kattintva teheti meg.
                    Igyekszünk minél hamarabb válaszolni!
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} direction="column" alignItems="stretch">
                <Button color="secondary" variant="contained" href="https://docs.google.com/forms/d/e/1FAIpQLSeL0p2n5BH5xMGdPTLSlhFG1Q3uF4ewiKCUGUzV1-80FDu41A/viewform?usp=sf_link" target="_blank" rel="noreferrer">
                    Regisztrálok háziorvosként/rendelőként
                </Button>
            </Grid>
            <Grid item xs={12} md={6} direction="column" alignItems="stretch">
                <Typography variant="body1" paragraph>
                    Kérdéseit küldje a ????@mikoroltanak.eu címre.
                </Typography>
            </Grid>
        </Grid>
    );
}
