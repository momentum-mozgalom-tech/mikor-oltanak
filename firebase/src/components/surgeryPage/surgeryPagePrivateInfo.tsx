import {
    Button,
    Grid, TextField, Typography,
} from "@material-ui/core";
import { IFirestoreSurgeryPrivate } from "@mikoroltanak/api";
import * as React from "react";
import { getGlobalServices } from "../../services/services";
import { sanitiseBirthdate } from "../../utils/birthdateUtils";
import { BirthdateList } from "./birthdateList";

export interface IProps {
    surgeryId: string;
    surgeryPrivate: IFirestoreSurgeryPrivate;
}

function isDefined<T>(value: T | undefined | null): value is T {
    return value != null;
}

function parseTextIntoBirthdates(value: string) {
    return value.split("\n").map(sanitiseBirthdate).filter(isDefined);
}

export function SurgeryPagePrivateInfo({ surgeryId, surgeryPrivate }: IProps) {
    const [birthdatesToAdd, setBirthdatesToAdd] = React.useState<string>("");
    const [birthdatesToRemove, setBirthdatesToRemove] = React.useState<string>("");
    const sanitisedBirthdatesToAdd = parseTextIntoBirthdates(birthdatesToAdd);
    const sanitisedBirthdatesToRemove = parseTextIntoBirthdates(birthdatesToRemove);
    const numberOfBirthdatesToAdd = sanitisedBirthdatesToAdd.length;
    const numberOfBirthdatesToRemove = sanitisedBirthdatesToRemove.length;

    const handleBirthdatesToAddChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setBirthdatesToAdd(event.target.value);
    }, [setBirthdatesToAdd]);

    const handleBirthdatesToRemoveChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setBirthdatesToRemove(event.target.value);
    }, [setBirthdatesToRemove]);

    const handleAddClick = React.useCallback(() => {
        getGlobalServices()?.dataService.addBirthdates({
            surgeryId,
            birthdates: sanitisedBirthdatesToAdd,
        });
    }, [surgeryId, sanitisedBirthdatesToAdd]);

    const handleRemoveClick = React.useCallback(() => {
        getGlobalServices()?.dataService.removeBirthdates({
            surgeryId,
            birthdates: sanitisedBirthdatesToRemove,
        });
    }, [surgeryId, sanitisedBirthdatesToRemove]);

    return (
        <>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Typography variant="h5" align="center">Új páciensek hozzáadása</Typography>
                <Typography variant="body1">
                    Másolja be az alábbi szövegdobozba az új páciensek születési dátumait.
                    Soronként egy dátum szerepeljen!
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <TextField
                    label="Új páciensek születési dátumai"
                    variant="outlined"
                    multiline
                    rows={8}
                    value={birthdatesToAdd}
                    onChange={handleBirthdatesToAddChange}
                />
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Button
                    disabled={numberOfBirthdatesToAdd === 0}
                    variant="contained"
                    color="primary"
                    onClick={handleAddClick}
                    fullWidth
                    size="large"
                >
                    {numberOfBirthdatesToAdd}
                    {" "}
                    születési dátum hozzáadása
                </Button>
            </Grid>

            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Typography variant="h5" align="center">Régi páciensek törlése</Typography>
                <Typography variant="body1">
                    Másolja be az alábbi szövegdobozba a törlendő páciensek születési dátumait.
                    Soronként egy dátum szerepeljen!
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <TextField
                    label="Törlendő páciensek születési dátumai"
                    variant="outlined"
                    multiline
                    rows={3}
                    value={birthdatesToRemove}
                    onChange={handleBirthdatesToRemoveChange}
                />
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Button
                    disabled={numberOfBirthdatesToRemove === 0}
                    variant="contained"
                    color="primary"
                    onClick={handleRemoveClick}
                    fullWidth
                    size="large"
                >
                    {numberOfBirthdatesToRemove}
                    {" "}
                    születési dátum törlése
                </Button>
            </Grid>

            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Typography variant="h5" align="center">Lista</Typography>
                <Typography variant="body2" paragraph>
                    Jelenleg az alábbi születési dátumok szerepelnek az ön listáján.
                </Typography>
                <BirthdateList surgeryPrivate={surgeryPrivate} />
            </Grid>
        </>
    );
}
