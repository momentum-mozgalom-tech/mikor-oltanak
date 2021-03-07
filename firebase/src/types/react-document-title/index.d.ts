// Based on https://github.com/gaearon/react-document-title

declare module "react-document-title" {
    import * as React from "react";

    interface DocumentTitleProps {
        title: string;
    }

    const DocumentTitle: React.FC<DocumentTitleProps>;
    export = DocumentTitle;
}
