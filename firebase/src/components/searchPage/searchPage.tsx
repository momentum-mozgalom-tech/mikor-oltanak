import styled from "styled-components/macro";
import {
    Button, CircularProgress, Grid, Paper, Typography,
} from "@material-ui/core";
import * as React from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { getGlobalServices } from "../../services/services";
import { dateToString } from "../../utils/birthdateUtils";
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
    const [birthdate, setBirthdate] = React.useState<Date | null>(null);

    const [searchState, setSearchState] = React.useState<ISearchState>();
    const isSearching = searchState?.type === "pending";

    const handleSearchClick = React.useCallback(() => {
        if (birthdate == null) {
            return;
        }
        const search = async () => {
            setSearchState({ type: "pending" });
            const birthdateString = dateToString(birthdate);
            try {
                const result = await getGlobalServices()?.functionsService.findPatient({
                    birthdate: birthdateString,
                });
                setSearchState({ type: "success", surgeryIds: result?.surgeryIds ?? [] });
            } catch (e) {
                const errorMessage = e?.message ?? "Nem sikerült a keresés - kérjük próbálkozzon újra!";
                setSearchState({ type: "failed", error: errorMessage });
                console.error(e);
            }
        };
        search();
    }, [birthdate, setSearchState]);

    return (
        <Grid container spacing={5} direction="column" alignItems="center">
            <Grid item xs={12} md={6}>
                <Typography variant="h2" align="center" gutterBottom>Mikor oltanak?</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="body1" paragraph>
                    Azt tapasztaltuk, hogy páciensként sokszor nem világos számunkra, hogy rajta
                    vagyunk-e már a háziorvosunk/rendelőnk oltási listáján. Orvosként pedig az amúgy is
                    emberfeletti teher mellett sokszor az aggódó, telefonon érdeklődő páciensekkel
                    kell tölteni az időt.
                </Typography>
                <Typography variant="body1" paragraph>
                    Ez az oldal ezt hivatott segíteni.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Páciensként</strong>
                    {" "}
                    megtalálhatja, hogy az ön születési dátuma szerepel-e a háziorvosának/rendelőjének oltási listáján,
                    ha háziorvosa/rendelője ezen a honlapon már regisztrált.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Háziorvosként/rendelőként</strong>
                    {" "}
                    pedig feltöltheti az oltásra várók születési dátumait,
                    hogy a páciensek itt ellenőrizhessék telefonálás helyett,
                    hogy szerepelnek-e az aktuális oltási listán.
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <KeyboardDatePicker
                    variant="inline"
                    format="yyyy-MM-dd"
                    margin="normal"
                    label="Születési dátum"
                    value={birthdate}
                    onChange={setBirthdate}
                />
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Button
                    disabled={birthdate == null || isSearching}
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
                    <CentredDiv>
                        <CircularProgress />
                    </CentredDiv>
                )}
                {searchState?.type === "failed" && (
                    <FailureResultPaper elevation={1}>
                        <Typography variant="body1">
                            <strong>Hiba a kereséskor!</strong>
                            {" "}
                            {searchState.error}
                        </Typography>
                    </FailureResultPaper>
                )}
                {searchState?.type === "success" && (
                    searchState.surgeryIds.length === 0 ? (
                        <FailureResultPaper elevation={1}>
                            <Typography variant="body1">
                                Az ön születési dátuma nem szerepel a weblapon regisztrált
                                háziorvos(ok)/rendelő(k) aktuális oltási listáján.
                                {" "}
                                <strong>
                                    Ettől még más háziorvosok vagy az állam
                                    oltási listáján szerepelhet.
                                </strong>
                            </Typography>
                        </FailureResultPaper>
                    ) : (
                        <SuccessResultPaper elevation={1}>
                            <Typography variant="body1">
                                Az ön születési dátuma az alábbi háziorvos(ok)/rendelő(k) oltási listáján szerepel.
                            </Typography>
                            <Typography variant="body2">
                                <strong>Figyelem!</strong>
                                {" "}
                                Nem biztos, hogy ön szerepel eze(ke)n az oltási listá(ko)n!
                                Lehetséges, hogy más szerepel a listán, ugyanezzel a születési dátummal.
                                Tájékozódjon a háziorvosánál/rendelőjénél!
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
                    Ez az oldal csak akkor tud segíteni,
                    ha háziorvosa/rendelője feltöltötte az aktuális oltási listáját.
                </Typography>
                <Typography variant="body2" paragraph>
                    Az oldal nem tárol semmilyen személyes adatot. Kizárólag születési dátumokat
                    tartalmaz anélkül, hogy konkrét személyhez kötődne.
                </Typography>
                <Typography variant="body2" paragraph>
                    A rendszer védelme érdekében naponta maximum 10 keresést végezhet el.
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Typography variant="h5" align="center">Az oldalon az alábbi háziorvosok/rendelők regisztráltak</Typography>
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

const CentredDiv = styled.div`
    text-align: center;
`;
