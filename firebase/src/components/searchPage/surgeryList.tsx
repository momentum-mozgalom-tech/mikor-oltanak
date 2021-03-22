import {
    CircularProgress, Divider, List, ListItem, ListItemText, TextField,
} from "@material-ui/core";
import * as React from "react";
import { useSelector } from "react-redux";
import { IFirestoreSurgery } from "@mikoroltanak/api";
import { selectSurgeries } from "../../store/selectors";

export interface IProps {
    showFilter: boolean;
    /** If specified, show these surgeries. Otherwise show all surgeries. */
    surgeryIds?: string[];
}

export function SurgeryList({ surgeryIds, showFilter }: IProps) {
    const [filter, setFilter] = React.useState("");
    const sanitisedFilter = filter.trim().toLowerCase();
    const surgeries = useSelector(selectSurgeries);
    const surgeryList = Object.entries(surgeries)
        .filter(([surgeryId]) => surgeryIds === undefined || surgeryIds.indexOf(surgeryId) !== -1)
        .filter(([, { name }]) => name.trim() !== "") // filter surgeries with no names set yet
        .sort(([, { name: nameA }], [, { name: nameB }]) => nameA.localeCompare(nameB));
    const filteredSurgeryList = surgeryList
        .filter(([, { name, description }]) => name.toLowerCase().includes(sanitisedFilter)
            || description.toLowerCase().includes(sanitisedFilter));

    const handleFilterChange = React.useCallback((event) => {
        setFilter(event.target.value);
    }, [setFilter]);

    const renderSurgery = React.useCallback((surgeryId: string, surgery: IFirestoreSurgery, index: number) => [
        index !== 0 ? <Divider key={`divider-${surgeryId}`} variant="fullWidth" /> : null,
        (
            <ListItem key={`surgery-${surgeryId}`}>
                <ListItemText primary={surgery.name} secondary={surgery.description} />
            </ListItem>
        ),
    ], []);

    if (surgeryList.length === 0) {
        return <CircularProgress />;
    }

    return (
        <List>
            {showFilter && (
                <ListItem key="search">
                    <TextField
                        label="Keresés a háziorvosok között"
                        type="search"
                        variant="standard"
                        fullWidth
                        value={filter}
                        onChange={handleFilterChange}
                    />
                </ListItem>
            )}
            {filteredSurgeryList.length === 0 && "Nincs találat"}
            {filteredSurgeryList.map(([surgeryId, surgery], index) => renderSurgery(surgeryId, surgery, index))}
        </List>
    );
}
