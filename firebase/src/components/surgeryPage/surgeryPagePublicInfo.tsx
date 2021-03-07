import {
    Button,
    Grid, TextField,
} from "@material-ui/core";
import * as React from "react";
import { useSelector } from "react-redux";
import { getGlobalServices } from "../../services/services";
import { selectSurgeries } from "../../store/selectors";

export function SurgeryPagePublicInfo({ surgeryId }: { surgeryId: string }) {
    const surgeries = useSelector(selectSurgeries);
    const surgery = surgeries[surgeryId];
    const [surgeryNameDraft, setSurgeryNameDraft] = React.useState<string>("");
    const [surgeryDescriptionDraft, setSurgeryDescriptionDraft] = React.useState<string>("");
    React.useEffect(() => {
        setSurgeryNameDraft(surgery?.name ?? "");
        setSurgeryDescriptionDraft(surgery?.description ?? "");
    }, [surgery, setSurgeryNameDraft, setSurgeryDescriptionDraft]);
    const isSurgeryModified = surgeryNameDraft !== (surgery?.name ?? "") || surgeryDescriptionDraft !== (surgery?.description ?? "");
    const isSurgeryNameInvalid = surgeryNameDraft.trim() === "";

    const handleNameChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSurgeryNameDraft(event.target.value);
    }, [setSurgeryNameDraft]);

    const handleDescriptionChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSurgeryDescriptionDraft(event.target.value);
    }, [setSurgeryDescriptionDraft]);

    const handleSaveClick = React.useCallback(() => {
        const newSurgery = {
            ...surgery,
            name: surgeryNameDraft.trim(),
            description: surgeryDescriptionDraft.trim(),
        };
        getGlobalServices()?.dataService.updateSurgery({
            surgeryId,
            surgery: newSurgery,
        });
    }, [surgery, surgeryNameDraft, surgeryDescriptionDraft, surgeryId]);

    return (
        <>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <TextField
                    label="Rendelő neve"
                    variant="outlined"
                    error={isSurgeryNameInvalid}
                    helperText={isSurgeryNameInvalid ? "A rendelő neve nem lehet üres" : undefined}
                    value={surgeryNameDraft}
                    onChange={handleNameChange}
                />
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <TextField
                    label="Rendelő leírása"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={surgeryDescriptionDraft}
                    onChange={handleDescriptionChange}
                />
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Button
                    disabled={!isSurgeryModified || isSurgeryNameInvalid}
                    variant="contained"
                    color="primary"
                    onClick={handleSaveClick}
                    fullWidth
                    size="large"
                >
                    Mentés
                </Button>
            </Grid>
        </>
    );
}
