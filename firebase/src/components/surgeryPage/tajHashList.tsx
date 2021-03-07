import {
    Divider, List, ListItem, ListItemText, Typography,
} from "@material-ui/core";
import * as React from "react";
import { IFirestoreSurgeryPrivate } from "@mikoroltanak/api";

export function TajHashList({ surgeryPrivate }: { surgeryPrivate: IFirestoreSurgeryPrivate }) {
    const { tajHashes } = surgeryPrivate;

    const renderTajHash = React.useCallback((tajHash: string) => (
        [
            (
                <ListItem key={`tajhash-${tajHash}`}>
                    <ListItemText primary={tajHash} />
                </ListItem>
            ),
            <Divider variant="fullWidth" key={`divider-${tajHash}`} />,
        ]
    ), []);

    if (tajHashes.length === 0) {
        return <Typography variant="body1">Még senki sem szerepel a listán</Typography>;
    }

    return (
        <>
            {tajHashes.length === 0 && <Typography variant="body1" paragraph>Még senki sem szerepel a listán</Typography>}
            {tajHashes.length > 0 && (
                <Typography variant="body1" paragraph>
                    <strong>
                        {tajHashes.length}
                        {" "}
                        páciens szerepel a listán
                    </strong>
                </Typography>
            )}
            <List>
                {tajHashes.map((tajHash) => renderTajHash(tajHash))}
            </List>
        </>
    );
}
