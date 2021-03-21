import {
    Button,
    Grid, TextField,
} from "@material-ui/core";
import * as React from "react";
import { useSelector } from "react-redux";
import { IFirestoreSurgery } from "@mikoroltanak/api";
import { getGlobalServices } from "../../services/services";
import { selectSurgeries } from "../../store/selectors";
import { surgeryValidator, useChangeHandler } from "./surgeryPageUtils";

export function SurgeryPagePublicInfo({ surgeryId }: { surgeryId: string }) {

    const surgeries = useSelector(selectSurgeries);
    const surgery = surgeries[surgeryId];
    const [surgeryNameDraft, setSurgeryNameDraft] = React.useState<string>("");
    const [surgeryLocationDraft, setSurgeryLocationDraft] = React.useState<string>("");
    const [surgeryEmailDraft, setSurgeryEmailDraft] = React.useState<string>("");
    const [surgeryPhoneDraft, setSurgeryPhoneDraft] = React.useState<string>("");
    const [surgeryDescriptionDraft, setSurgeryDescriptionDraft] = React.useState<string>("");

    React.useEffect(() => {
        setSurgeryNameDraft(surgery?.name ?? "");
        setSurgeryLocationDraft(surgery?.location ?? "");
        setSurgeryEmailDraft(surgery?.email ?? "");
        setSurgeryPhoneDraft(surgery?.phone ?? "");
        setSurgeryDescriptionDraft(surgery?.description ?? "");
    }, [surgery,
        setSurgeryNameDraft,
        setSurgeryLocationDraft,
        setSurgeryEmailDraft,
        setSurgeryPhoneDraft, 
        setSurgeryDescriptionDraft]
    );

    const isSurgeryModified = surgeryValidator(surgery, {
        name: surgeryNameDraft,
        location: surgeryLocationDraft,
        email: surgeryEmailDraft,
        phone: surgeryPhoneDraft,
        description: surgeryDescriptionDraft});

    const isFieldValueEmpty = (fieldValue: string): boolean => !fieldValue.trim().length;
    
    const handleNameChange = useChangeHandler(setSurgeryNameDraft);
    const handleLocationChange = useChangeHandler(setSurgeryLocationDraft);
    const handleEmailChange = useChangeHandler(setSurgeryEmailDraft);
    const handlePhoneChange = useChangeHandler(setSurgeryPhoneDraft);
    const handleDescriptionChange = useChangeHandler(setSurgeryDescriptionDraft);

    const handleSaveClick = React.useCallback(() => {
        const newSurgery: IFirestoreSurgery = {
            ...surgery,
            name: surgeryNameDraft.trim(),
            location: surgeryLocationDraft.trim(),
            email: surgeryEmailDraft.trim(),
            phone: surgeryPhoneDraft.trim(),
            description: surgeryDescriptionDraft.trim(),
        };
        getGlobalServices()?.dataService.updateSurgery({
            surgeryId,
            surgery: newSurgery,
        });
    }, [surgery,
        surgeryNameDraft,
        surgeryLocationDraft,
        surgeryEmailDraft,
        surgeryPhoneDraft,
        surgeryDescriptionDraft,
        surgeryId]);

    return (
        <>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <TextField
                    label="Háziorvos/rendelő neve"
                    variant="outlined"
                    error={isFieldValueEmpty(surgeryNameDraft)}
                    helperText={isFieldValueEmpty(surgeryNameDraft) ? "A háziorvos/rendelő neve nem lehet üres" : "Itt megadhatja a háziorvos/rendelő nevét"}
                    value={surgeryNameDraft}
                    onChange={handleNameChange}
                />
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <TextField
                    label="Rendelő helye"
                    variant="outlined"
                    error={isFieldValueEmpty(surgeryLocationDraft)}
                    helperText={isFieldValueEmpty(surgeryLocationDraft) ? "A hely nem lehet üres" : "Itt megadhatja a háziorvosi rendelő városát, kerületét, címét"}
                    value={surgeryLocationDraft}
                    onChange={handleLocationChange}
                />
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <TextField
                    label="E-mail cím"
                    variant="outlined"
                    helperText={"Itt megadhatja a háziorvos emailcímét"}
                    value={surgeryEmailDraft}
                    onChange={handleEmailChange}
                />
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <TextField
                    label="Telefonszám"
                    variant="outlined"
                    helperText={"Itt megadhatja a háziorvos telefonszámát pl.: +3612345678"}
                    value={surgeryPhoneDraft}
                    onChange={handlePhoneChange}
                />
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <TextField
                    label="Háziorvos/rendelő leírása"
                    variant="outlined"
                    multiline
                    rows={4}
                    helperText="Itt megadhatja pl. a betegek által hívható telefonszámot vagy egyéb információt."
                    value={surgeryDescriptionDraft}
                    onChange={handleDescriptionChange}
                />
            </Grid>
            <Grid item xs={12} md={6} container direction="column" alignItems="stretch">
                <Button
                    disabled={!isSurgeryModified || isFieldValueEmpty(surgeryNameDraft)}
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
