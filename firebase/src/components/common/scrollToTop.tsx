import * as React from "react";
import { useLocation } from "react-router-dom";
import { usePrevious } from "../../utils/hooks";

interface IProps {
    children: React.ReactNode;
}

export function ScrollToTop({ children }: IProps) {
    const location = useLocation();
    const previousUrl = usePrevious(location.pathname, "");

    if (location.pathname !== previousUrl) {
        window.scrollTo(0, 0);
    }

    return <>{children}</>;
}
