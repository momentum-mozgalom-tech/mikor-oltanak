import * as React from "react";
import DocumentTitle from "react-document-title";
import { AppHeader } from "./appHeader";
import { LoginProtector } from "./loginProtector";

interface IProps {
    title: string;
    isAuthRequired: boolean;
    children: React.ReactNode;
}

export function PageFrame({ title, isAuthRequired, children }: IProps) {
    return (
        <DocumentTitle title={title}>
            <>
                <AppHeader />
                {isAuthRequired ? (
                    <LoginProtector>
                        {children}
                    </LoginProtector>
                ) : children}
            </>
        </DocumentTitle>
    );
}
