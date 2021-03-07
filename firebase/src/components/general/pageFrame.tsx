import * as React from "react";
import DocumentTitle from "react-document-title";
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
                {children}
            </>
        </DocumentTitle>
    );
}
