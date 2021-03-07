import {
    CircularProgress, Divider, List, ListItem, ListItemText,
} from "@material-ui/core";
import * as React from "react";
import { useSelector } from "react-redux";
import { IFirestoreSurgery } from "@mikoroltanak/api";
import { selectSurgeries } from "../../store/selectors";

export interface IProps {
    /** If specified, show these surgeries. Otherwise show all surgeries. */
    surgeryIds?: string[];
}

export function SurgeryList({ surgeryIds }: IProps) {
    const surgeries = useSelector(selectSurgeries);
    const surgeryList = Object.entries(surgeries)
        .filter(([surgeryId]) => surgeryIds === undefined || surgeryIds.indexOf(surgeryId) !== -1)
        .sort(([, { name: nameA }], [, { name: nameB }]) => nameA.localeCompare(nameB));

    const renderSurgery = React.useCallback((surgeryId: string, surgery: IFirestoreSurgery, index: number) => (
        <>
            {index !== 0 && <Divider key={`divider-${surgeryId}`} variant="fullWidth" />}
            <ListItem key={`surgery-${surgeryId}`}>
                <ListItemText primary={surgery.name} secondary={surgery.description} />
            </ListItem>
        </>
    ), []);

    if (surgeryList.length === 0) {
        return <CircularProgress />;
    }

    return (
        <List>
            {surgeryList.map(([surgeryId, surgery], index) => renderSurgery(surgeryId, surgery, index))}
        </List>
    );
}
