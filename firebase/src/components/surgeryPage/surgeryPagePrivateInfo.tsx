import {
    Button,
    Grid, TextField, Typography,
} from "@material-ui/core";
import { IFirestoreSurgeryPrivate } from "@mikoroltanak/api";
import * as React from "react";
import { getGlobalServices } from "../../services/services";
import { checkTaj, createTajHash, sanitiseTaj } from "../../utils/tajUtils";
import { TajHashList } from "./tajHashList";

export interface IProps {
    surgeryId: string;
    surgeryPrivate: IFirestoreSurgeryPrivate;
}

function isDefined<T>(value: T | undefined | null): value is T {
    return value != null;
}

function parseTextIntoTajs(value: string) {
    return value.split("\n").map((row) => {
        const sanitisedTaj = sanitiseTaj(row);
        const isTajCorrect = checkTaj(sanitisedTaj);
        return isTajCorrect ? sanitisedTaj : undefined;
    }).filter(isDefined);
}

export function SurgeryPagePrivateInfo({ surgeryId, surgeryPrivate }: IProps) {
    const [tajsToAdd, setTajsToAdd] = React.useState<string>("");
    const [tajsToRemove, setTajsToRemove] = React.useState<string>("");
    const sanitisedTajsToAdd = parseTextIntoTajs(tajsToAdd);
    const sanitisedTajsToRemove = parseTextIntoTajs(tajsToRemove);
    const numberOfTajsToAdd = sanitisedTajsToAdd.length;
    const numberOfTajsToRemove = sanitisedTajsToRemove.length;

    const handleTajsToAddChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setTajsToAdd(event.target.value);
    }, [setTajsToAdd]);

    const handleTajsToRemoveChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setTajsToRemove(event.target.value);
    }, [setTajsToRemove]);

    const handleAddClick = React.useCallback(() => {
        const tajHashesToAdd = sanitisedTajsToAdd.map(createTajHash);
        getGlobalServices()?.dataService.addTajHashes({
            surgeryId,
            tajHashes: tajHashesToAdd,
        });
    }, [surgeryId, sanitisedTajsToAdd]);

    const handleRemoveClick = React.useCallback(() => {
        const tajHashesToRemove = sanitisedTajsToRemove.map(createTajHash);
        getGlobalServices()?.dataService.removeTajHashes({
            surgeryId,
            tajHashes: tajHashesToRemove,
        });
    }, [surgeryId, sanitisedTajsToRemove]);

    return (
        <>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Typography variant="h5" align="center">Új páciensek hozzáadása</Typography>
                <Typography variant="body1">
                    Másolja be az alábbi szövegdobozba az új páciensek tajszámait.
                    Soronként egy tajszám szerepeljen!
                </Typography>
                <Typography variant="body1">
                    <strong>
                        Az eszköz csak saját felelősségre használható!
                    </strong>
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <TextField
                    label="Új páciensek tajszámai"
                    variant="outlined"
                    multiline
                    rows={8}
                    value={tajsToAdd}
                    onChange={handleTajsToAddChange}
                />
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Button
                    disabled={numberOfTajsToAdd === 0}
                    variant="contained"
                    color="primary"
                    onClick={handleAddClick}
                    fullWidth
                    size="large"
                >
                    {numberOfTajsToAdd}
                    {" "}
                    tajszám hozzáadása
                </Button>
            </Grid>

            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Typography variant="h5" align="center">Régi páciensek törlése</Typography>
                <Typography variant="body1">
                    Másolja be az alábbi szövegdobozba a törlendő páciensek tajszámait.
                    Soronként egy tajszám szerepeljen!
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <TextField
                    label="Törlendő páciensek tajszámai"
                    variant="outlined"
                    multiline
                    rows={3}
                    value={tajsToRemove}
                    onChange={handleTajsToRemoveChange}
                />
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Button
                    disabled={numberOfTajsToRemove === 0}
                    variant="contained"
                    color="primary"
                    onClick={handleRemoveClick}
                    fullWidth
                    size="large"
                >
                    {numberOfTajsToRemove}
                    {" "}
                    tajszám törlése
                </Button>
            </Grid>

            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Typography variant="h5" align="center">Lista</Typography>
                <Typography variant="body2" paragraph>
                    Megjegyzés: az alábbi listán nem a tajszámok láthatóak, mert azokat
                    adatvédelmi okokból mi nem tárolhatjuk. Ehelyett tajszámokból származtatott
                    visszafejthetetlen kódokat használunk.
                </Typography>
                <TajHashList surgeryPrivate={surgeryPrivate} />
            </Grid>
        </>
    );
}
