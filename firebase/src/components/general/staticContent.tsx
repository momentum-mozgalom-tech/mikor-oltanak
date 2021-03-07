import * as React from "react";
import styled from "styled-components/macro";

interface IProps {
    type: "terms of service" | "privacy policy";
}

export function StaticContent({ type }: IProps) {
    return (
        <StaticContentContainer>
            {type === "terms of service" ? (
                <div>
                    <h1>Felhasználási feltételek</h1>
                </div>
            ) : null}

            {type === "privacy policy" ? (
                <div>
                    <h1>Adatvédelmi nyilatkozat</h1>
                </div>
            ) : null}
        </StaticContentContainer>
    );
}

// Styles
const StaticContentContainer = styled.div`
    padding: 20px 40px;
`;
