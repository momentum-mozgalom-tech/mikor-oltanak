import * as React from "react";
import styled from "styled-components/macro";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@material-ui/core";

interface IProps {
    /** What to delete; the dialog is closed when `thing` is undefined */
    thing: string | undefined;
    /** The delete operation */
    doDelete: () => Promise<void> | void;
    /** Called when the dialog closes (with or without deletion) */
    onClose: () => void;
}

export function DeleteDialog({
    thing, doDelete, onClose,
}: IProps) {
    const isOpen = thing !== undefined;

    const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

    const handleDeleteClick = React.useCallback(async () => {
        setIsDeleting(true);
        try {
            await doDelete();
            onClose();
        } catch (e) {
            console.error(`Failed to delete ${thing}`, e);
        }
        setIsDeleting(false);
    }, [thing, doDelete, onClose]);

    return (
        <StyledDialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
            classes={{ paper: "paper" }}
        >
            <StyledDialogTitle id="form-dialog-title" disableTypography>
                Delete
                {" "}
                <strong>{thing}</strong>
            </StyledDialogTitle>

            <StyledDialogContent>
                Are you use you want to delete
                {" "}
                <strong>{thing}</strong>
                ? This cannot be undone.
            </StyledDialogContent>

            <DialogActions>
                <Button
                    onClick={onClose}
                    variant="contained"
                    disabled={isDeleting}
                >
                    Cancel
                </Button>

                <Button
                    onClick={handleDeleteClick}
                    variant="contained"
                    color="secondary"
                    disabled={isDeleting}
                >
                    Delete
                    {" "}
                    {thing}
                </Button>
            </DialogActions>
        </StyledDialog>
    );
}

// Styles
const StyledDialog = styled(Dialog)`
    .paper {
        padding: ${({ theme }) => theme.spacing(5)};
        padding-bottom:  ${({ theme }) => theme.spacing(7)};
    }
`;

const StyledDialogTitle = styled(DialogTitle)`
    padding-bottom:  ${({ theme }) => theme.spacing(5)};
    font-size: 1.3rem;
    font-weight: 500;
`;

const StyledDialogContent = styled(DialogContent)`
    padding-right: ${({ theme }) => theme.spacing(3)};
    margin-bottom: ${({ theme }) => theme.spacing(5)};

    & > * {
        margin-bottom: ${({ theme }) => theme.spacing(3)};
    }
`;
