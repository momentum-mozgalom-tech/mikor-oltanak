import * as React from "react";
import styled from "styled-components/macro";
import { getGlobalServices } from "../../services/services";

interface IProps {
    redirectUrl: string | undefined;
}

export function Login({ redirectUrl }: IProps) {
    const loginRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (loginRef.current == null) {
            return;
        }

        const globalServices = getGlobalServices();

        if (globalServices !== undefined) {
            globalServices.firebaseAuthUiService.authStart(loginRef.current, redirectUrl);
        }
    }, [redirectUrl]);

    return (
        <LoginContainer>
            <div ref={loginRef} />
        </LoginContainer>
    );
}

// Styles
const LoginContainer = styled.div`
    padding-top: 0;
`;
