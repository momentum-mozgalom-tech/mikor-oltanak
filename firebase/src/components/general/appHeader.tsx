import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import {
    AppBar,
    Button,
    IconButton,
    Snackbar,
    SnackbarContent,
    Toolbar,
    Typography,
} from "@material-ui/core";
import { amber, green, purple } from "@material-ui/core/colors";
import { Close } from "@material-ui/icons";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { getGlobalServices } from "../../services/services";
import {
    selectCurrentUser,
    selectHasPendingWrites,
    selectIsLoadingData,
} from "../../store/selectors";
import { usePrevious } from "../../utils/hooks";
import { NavUtils, Page } from "../../utils/navUtils";

const momentumTheme = createMuiTheme({
    palette: {
        primary: purple,
    },
});

export function AppHeader() {
    const [isSignedOutMessageOpen, setSignedOutMessageOpen] = React.useState(false);
    const [isSaveSuccessfulMessageOpen, setSaveSuccessfulMessageOpen] = React.useState(false);

    const currentUser = useSelector(selectCurrentUser);
    const hasPendingWrites = useSelector(selectHasPendingWrites);
    const isLoadingData = useSelector(selectIsLoadingData);
    const hasPendingWritesPrevious = usePrevious(hasPendingWrites, false);

    React.useEffect(() => {
        const fb = ((window as any).FB);
        if (fb == null) {
            return;
        }
        fb.XFBML.parse();
    });

    React.useEffect(() => {
        if (hasPendingWritesPrevious && !hasPendingWrites) {
            setSaveSuccessfulMessageOpen(true);
        }
    }, [hasPendingWritesPrevious, hasPendingWrites]);

    const isLoggedIn = currentUser !== undefined;

    const handleSignOutClick = async () => {
        const globalServices = getGlobalServices();
        if (globalServices === undefined) {
            return;
        }

        await globalServices.firebaseAuthService.authSignOut();
        setSignedOutMessageOpen(true);
    };

    return (
        <MainAppBar position="static" elevation={0}>
            <Toolbar>
                <AppTitle variant="h6">
                    <AppTitleLink to={NavUtils.getNavUrl[Page.Kezdolap]()}>
                        Mikor oltanak?
                    </AppTitleLink>
                </AppTitle>

                <AppIcons>
                    <IconLink to={NavUtils.getNavUrl[Page.Kereses]()}>
                        <Button color="inherit" size="small">
                            Keresés
                        </Button>
                    </IconLink>
                    <IconLink to={NavUtils.getNavUrl[Page.Rendelo]()}>
                        <Button color="inherit" size="small">
                            Háziorvosoknak / rendelőknek
                        </Button>
                    </IconLink>
                    <IconLink to={NavUtils.getNavUrl[Page.Info]()}>
                        <Button color="inherit" size="small">
                            Gyakori kérdések
                        </Button>
                    </IconLink>
                </AppIcons>

                <ThemeProvider theme={momentumTheme}>
                    <MomentumButtonContainer>
                        <Button
                            href="https://jelentkezes.momentum.hu"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="contained"
                            size="small"
                            color="primary"
                        >
                            Segítsen Ön is
                        </Button>
                    </MomentumButtonContainer>
                </ThemeProvider>

                <ShareButtonContainer
                    className="fb-share-button"
                    data-href="https://mikoroltanak.hu"
                    data-layout="button_count"
                    data-size="large"
                >
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmikoroltanak.hu%2F&amp;src=sdkpreparse"
                        className="fb-xfbml-parse-ignore"
                    >
                        Share
                    </a>
                </ShareButtonContainer>

                {isLoggedIn ? (
                    <Button
                        onClick={handleSignOutClick}
                        variant="outlined"
                        size="medium"
                        color="inherit"
                    >
                        Kijelentkezés
                    </Button>
                ) : null}

                <Snackbar
                    autoHideDuration={3000}
                    anchorOrigin={{ horizontal: "center", vertical: "top" }}
                    message={<span>Sikeresen kilépett</span>}
                    onClose={() => setSignedOutMessageOpen(false)}
                    open={isSignedOutMessageOpen}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={() => setSignedOutMessageOpen(false)}
                        >
                            <Close />
                        </IconButton>,
                    ]}
                />

                <Snackbar
                    anchorOrigin={{ horizontal: "right", vertical: "top" }}
                    open={hasPendingWrites}
                >
                    <SnackbarContent
                        message={<span>Mentés...</span>}
                        style={{ backgroundColor: amber[900] }}
                    />
                </Snackbar>

                <Snackbar
                    anchorOrigin={{ horizontal: "right", vertical: "top" }}
                    open={isLoadingData}
                >
                    <SnackbarContent
                        message={<span>Töltés...</span>}
                        style={{ backgroundColor: amber[900] }}
                    />
                </Snackbar>

                <Snackbar
                    autoHideDuration={3000}
                    anchorOrigin={{ horizontal: "right", vertical: "top" }}
                    open={isSaveSuccessfulMessageOpen}
                    onClose={() => setSaveSuccessfulMessageOpen(false)}
                >
                    <SnackbarContent
                        message={<span>Sikeres mentés</span>}
                        style={{ backgroundColor: green[700] }}
                    />
                </Snackbar>
            </Toolbar>
        </MainAppBar>
    );
}

// Styles
const MainAppBar = styled(AppBar)`
    padding: ${({ theme }) => theme.spacing(0, 5)};
`;

const AppTitle = styled(Typography)`
    margin-right: ${({ theme }) => theme.spacing(10)};
`;

const AppTitleLink = styled(Link)`
    color: inherit;
`;

const AppIcons = styled.div`
    ${({ theme }) => `
        flex-grow: 1;
        ${theme.breakpoints.down("xs")} {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    `}
`;

const IconLink = styled(Link)`
    margin-left: 5px;
    margin-right: 5px;
    color: inherit;
`;

const ShareButtonContainer = styled.div`
    margin-right: 1rem;
`;

const MomentumButtonContainer = styled.div`
    margin-right: 1rem;
`;
