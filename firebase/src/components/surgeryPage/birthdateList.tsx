import {
    Divider, List, ListItem, ListItemText, Typography,
} from "@material-ui/core";
import * as React from "react";
import { IFirestoreSurgeryPrivate } from "@mikoroltanak/api";

export function BirthdateList({ surgeryPrivate }: { surgeryPrivate: IFirestoreSurgeryPrivate }) {
    const { birthdates: birthdatesUnsorted } = surgeryPrivate;
    const birthdates = birthdatesUnsorted.sort();

    const renderBirthdate = React.useCallback((birthdate: string) => (
        [
            (
                <ListItem key={`value-${birthdate}`}>
                    <ListItemText primary={birthdate} />
                </ListItem>
            ),
            <Divider variant="fullWidth" key={`divider-${birthdate}`} />,
        ]
    ), []);

    return (
        <>
            {birthdates.length === 0 && <Typography variant="body1" paragraph>Még senki sem szerepel a listán</Typography>}
            {birthdates.length > 0 && (
                <Typography variant="body1" paragraph>
                    <strong>
                        {birthdates.length}
                        {" "}
                        páciens szerepel a listán
                    </strong>
                </Typography>
            )}
            <List>
                {birthdates.map((birthdate) => renderBirthdate(birthdate))}
            </List>
        </>
    );
}
