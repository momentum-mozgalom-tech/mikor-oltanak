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
                <Typography variant="h5" align="center">??j p??ciensek hozz??ad??sa</Typography>
                <Typography variant="body1" paragraph>
                    M??solja be az al??bbi sz??vegdobozba az ??j p??ciensek sz??let??si d??tumait.
                </Typography>
                <Typography variant="body2" paragraph>
                    Soronk??nt egy d??tum szerepeljen!
                    A d??tumok 1990-12-31, 1990.12.31 vagy hasonl?? form??ban szerepeljenek.
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <TextField
                    label="??j p??ciensek sz??let??si d??tumai"
                    variant="outlined"
                    multiline
                    rows={8}
                    value={birthdatesToAdd}
                    onChange={handleBirthdatesToAddChange}
                />
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                {sanitisedBirthdatesToAdd.length !== 0 && (
                    <Typography variant="caption">
                        A k??vetkez?? sz??let??si d??tumok szerepelnek a sz??vegdobozban:
                        {" "}
                        {sanitisedBirthdatesToAdd.join(", ")}
                    </Typography>
                )}
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
                    sz??let??si d??tum hozz??ad??sa
                </Button>
            </Grid>

            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Typography variant="h5" align="center">Az ??sszes p??ciens t??rl??se</Typography>
                <Typography variant="body1">
                    Az al??bbi gombra kattintva t??r??lheti az eddig felvitt sz??let??si d??tumok
                    teljes list??j??t.
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <FormControlLabel
                    control={<Checkbox checked={isRemoveConfirmed} onChange={handleIsRemoveConfirmedChange} />}
                    label="Biztos, hogy t??rli az ??sszes eddigi sz??let??si d??tumot?"
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
                    Az ??sszes sz??let??si d??tum t??rl??se
                </Button>
            </Grid>

            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Typography variant="h5" align="center">Lista</Typography>
                <Typography variant="body2" paragraph>
                    Jelenleg az al??bbi sz??let??si d??tumok szerepelnek az ??n list??j??n.
                </Typography>
                <BirthdateList surgeryPrivate={surgeryPrivate} />
            </Grid>
        </>
    );
}
