import styled from "styled-components/macro";
import {
    Button, CircularProgress, Grid, Paper, TextField, Typography,
} from "@material-ui/core";
import * as React from "react";
import { getGlobalServices } from "../../services/services";
import { checkTaj, createTajHash, sanitiseTaj } from "../../utils/tajUtils";
import { SurgeryList } from "./surgeryList";

type ISearchState = {
    type: "pending";
} | {
    type: "failed";
    error: string;
} | {
    type: "success";
    surgeryIds: string[];
};

export function SearchPage() {
    const [taj, setTaj] = React.useState<string>("");
    const sanitisedTaj = sanitiseTaj(taj);
    const isTajCorrect = checkTaj(sanitisedTaj);
    const tajHelperText = taj === "" || isTajCorrect ? undefined : "A tajszámnak 9 számjegyet kell tartalmaznia";

    const [searchState, setSearchState] = React.useState<ISearchState>();
    const isSearching = searchState?.type === "pending";

    const handleTajChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setTaj(event.target.value);
    }, [setTaj]);

    const handleSearchClick = React.useCallback(() => {
        const search = async () => {
            setSearchState({ type: "pending" });
            const tajHash = createTajHash(taj);
            try {
                const result = await getGlobalServices()?.functionsService.findPatient({
                    tajHash,
                });
                setSearchState({ type: "success", surgeryIds: result?.surgeryIds ?? [] });
            } catch (e) {
                setSearchState({ type: "failed", error: "Nem sikerült a keresés - kérjük próbálkozzon újra!" });
                console.error(e);
            }
        };
        search();
    }, [taj, setSearchState]);

    return (
        <Grid container spacing={5} direction="column" alignItems="center">
            <Grid item xs={12} md={6}>
                <Typography variant="h2" gutterBottom>Mikor oltanak?</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="body1" paragraph>
                    Azt tapasztaltuk, hogy páciensként sokszor nem világos számunkra, hogy rajta
                    vagyunk-e már a körzeti rendelőnk oltási listáján. Rendelőként pedig az amúgyis
                    emberfeletti teher mellett sokszor az aggódó, telefonon érdeklődő páciensekkel
                    kell tölteni az időt.
                </Typography>
                <Typography variant="body1" paragraph>
                    Ez az oldal ezt hivatott segíteni.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Páciensként</strong>
                    {" "}
                    megtalálhatja, hogy szerepel-e a rendelőjének oltási listáján,
                    ha a rendelője már regisztrált.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Rendelőként</strong>
                    {" "}
                    pedig feltöltheti az oltásra várók listáját,
                    hogy a páciensek itt ellenőrizhessék telefonálás helyett.
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <TextField
                    label="Tajszám"
                    variant="outlined"
                    helperText={tajHelperText}
                    value={taj}
                    onChange={handleTajChange}
                    disabled={isSearching}
                />
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Button
                    disabled={!isTajCorrect || isSearching}
                    variant="contained"
                    color="primary"
                    onClick={handleSearchClick}
                    fullWidth
                    size="large"
                >
                    Keresés
                </Button>
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                {searchState?.type === "pending" && (
                    <CircularProgress />
                )}
                {searchState?.type === "failed" && (
                    <Typography variant="body1">
                        {searchState.error}
                    </Typography>
                )}
                {searchState?.type === "success" && (
                    searchState.surgeryIds.length === 0 ? (
                        <FailureResultPaper elevation={1}>
                            <Typography variant="body1">
                                Ön még nem szerepel oltási listán.
                            </Typography>
                        </FailureResultPaper>
                    ) : (
                        <SuccessResultPaper elevation={1}>
                            <Typography variant="body1">
                                Ön a következő rendelő oltási listáján szerepel:
                            </Typography>
                            <SurgeryList surgeryIds={searchState.surgeryIds} />
                        </SuccessResultPaper>
                    )
                )}
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Typography variant="body2" paragraph>
                    <strong>Fontos!</strong>
                    {" "}
                    Ez az oldal csak akkor tud segíteni, ha a rendelője feltöltötte az oltási listájukat.
                </Typography>
                <Typography variant="body2" paragraph>
                    Továbbá az oldal nem tárol semmilyen személyes adatot.
                    A keresett tajszámot sosem juttatjuk el a szerverekhez, hanem ezeknek egy kriptográfiailag
                    hashelt, visszafejthetetlen verzióját küldjük el.
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Typography variant="h5">Az oldalon az alábbi rendelők regisztráltak</Typography>
                <SurgeryList />
            </Grid>
        </Grid>
    );
}

const ResultPaper = styled(Paper)`
    margin: 1rem;
    padding: 1rem;
`;

const SuccessResultPaper = styled(ResultPaper)`
    background-color: #e8ffde;
`;

const FailureResultPaper = styled(ResultPaper)`
    background-color: #ffe4e0;
`;
