import { History } from "history";
import * as queryString from "query-string";

export enum Page {
    // General pages
    Kezdolap = "kezdolap",
    Bejelentkezes = "bejelentkezes",
    FelhasznalasiFeltetelek = "felhasznalasi-feltetelek",
    AdatvedelmiNyilatkozat = "adatvedelmi-nyilatkozat",
    Kereses = "kereses",
    Rendelo = "rendelo",
}

interface ISignInRouteQueryParams {
    redirectUrl: string | undefined;
}

const getNavUrl = {
    [Page.Kezdolap]: () => "/",
    [Page.Bejelentkezes]: (redirectUrl?: string) => `/bejelentkezes${redirectUrl === undefined ? "" : `?redirectUrl=${redirectUrl}`}`,
    [Page.FelhasznalasiFeltetelek]: () => "/felhasznalasi-feltetelek",
    [Page.AdatvedelmiNyilatkozat]: () => "/adatvedelmi-nyilatkozat",
    [Page.Kereses]: () => "/kereses",
    [Page.Rendelo]: () => "/rendelo",
};

const getNavUrlTemplate: { [page in Page]: () => string } = {
    [Page.Kezdolap]: getNavUrl[Page.Kezdolap],
    [Page.Bejelentkezes]: getNavUrl[Page.Bejelentkezes],
    [Page.FelhasznalasiFeltetelek]: getNavUrl[Page.FelhasznalasiFeltetelek],
    [Page.AdatvedelmiNyilatkozat]: getNavUrl[Page.AdatvedelmiNyilatkozat],
    [Page.Kereses]: getNavUrl[Page.Kereses],
    [Page.Rendelo]: getNavUrl[Page.Rendelo],
};

const getNavUrlQueryParams = {
    [Page.Bejelentkezes]: (value: string) => (
        queryString.parse(value) as unknown
    ) as ISignInRouteQueryParams,
};

const singInAndReturn = (history: History) => {
    const currentPath = history.location.pathname;
    history.push(getNavUrl[Page.Bejelentkezes](currentPath));
};

const pageTitleBase = "Mikor oltanak?";
const pageTitleEnding = "";

const wrapText = (params: { prefix?: string; suffix?: string;}) => (text: string) => {
    const { prefix, suffix } = params;
    const prefixProper = prefix === undefined ? "" : `${prefix} - `;
    const suffixProper = suffix === undefined ? "" : ` - ${suffix}`;
    return `${prefixProper}${text}${suffixProper}`;
};

function getPageTitle(title?: string) {
    return wrapText({ prefix: title })(`${pageTitleBase}${pageTitleEnding}`);
}

const getNavUrlSimpleTitle = {
    [Page.Kezdolap]: getPageTitle(),
    [Page.Bejelentkezes]: getPageTitle("Bejelentkezés"),
    [Page.FelhasznalasiFeltetelek]: getPageTitle("Felhasználási feltételek"),
    [Page.AdatvedelmiNyilatkozat]: getPageTitle("Adatvédelmi nyilatkozat"),
    [Page.Kereses]: getPageTitle("Keresés"),
    [Page.Rendelo]: getPageTitle("Háziorvosoknak/rendelőknek"),
} as const;

export const NavUtils = {
    getNavUrl,
    getNavUrlTemplate,
    getNavUrlQueryParams,
    singInAndReturn,
    getNavUrlSimpleTitle,
};
