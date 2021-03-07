import * as React from "react";
import DocumentTitle from "react-document-title";
import styled from "styled-components/macro";
import { AppHeader } from "./appHeader";

interface IProps {
    title: string;
    children: React.ReactNode;
}

export function PageFrame({ title, children }: IProps) {
    return (
        <DocumentTitle title={title}>
            <>
                <AppHeader />
                <PageContent>
                    {children}
                </PageContent>
            </>
        </DocumentTitle>
    );
}

const PageContent = styled.div`
    padding: 2rem;
`;
