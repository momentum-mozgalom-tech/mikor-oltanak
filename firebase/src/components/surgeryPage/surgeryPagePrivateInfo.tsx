import {
    Button,
    Checkbox,
    FormControlLabel,
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
    const [isRemoveConfirmed, setIsRemoveConfirmed] = React.useState<boolean>(false);
    const sanitisedBirthdatesToAdd = parseTextIntoBirthdates(birthdatesToAdd);
    const numberOfBirthdatesToAdd = sanitisedBirthdatesToAdd.length;

    const handleBirthdatesToAddChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setBirthdatesToAdd(event.target.value);
    }, [setBirthdatesToAdd]);

    const handleIsRemoveConfirmedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsRemoveConfirmed(event.target.checked);
    };

    const handleAddClick = React.useCallback(() => {
        getGlobalServices()?.dataService.addBirthdates({
            surgeryId,
            birthdates: sanitisedBirthdatesToAdd,
        });
    }, [surgeryId, sanitisedBirthdatesToAdd]);

    const handleRemoveAllClick = React.useCallback(() => {
        setIsRemoveConfirmed(false);
        getGlobalServices()?.dataService.removeAllBirthdates({
            surgeryId,
        });
    }, [surgeryId]);

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
                <Typography variant="h5" align="center">Az összes páciens törlése</Typography>
                <Typography variant="body1">
                    Az alábbi gombra kattintva törölheti az eddig felvitt születési dátumok
                    teljes listáját.
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <FormControlLabel
                    control={<Checkbox checked={isRemoveConfirmed} onChange={handleIsRemoveConfirmedChange} />}
                    label="Biztos, hogy törli az összes eddigi születési dátumot?"
                />
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Button
                    disabled={!isRemoveConfirmed}
                    variant="contained"
                    color="primary"
                    onClick={handleRemoveAllClick}
                    fullWidth
                    size="large"
                >
                    Az összes születési dátum törlése
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
