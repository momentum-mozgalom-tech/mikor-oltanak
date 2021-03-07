import * as React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";
import { Typography } from "@material-ui/core";
import { selectCurrentUser } from "../../store/selectors";
import { IAppState } from "../../store/state";

interface IProps {
    children: React.ReactNode;
}

function accessMessage(content: React.ReactNode) {
    return (
        <PageContent>
            <Typography variant="h4" align="center">
                {content}
            </Typography>
        </PageContent>
    );
}

export function LoginProtector({ children }: IProps) {
    const isLoggedIn = useSelector((state: IAppState) => selectCurrentUser(state) !== undefined);

    return isLoggedIn ? <>{children}</> : accessMessage("Jelentkezzen be a lap megtekintéséhez.");
}

// Styles
const PageContent = styled.div`
    min-height: 90vh;
    padding: 10vh 20px 0 20px;
`;
