import * as React from "react";
import DocumentTitle from "react-document-title";
import { useSelector } from "react-redux";
import { RouteComponentProps, useHistory } from "react-router";
import { Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components/macro";
import { selectCurrentUser } from "../store/selectors";
import { NavUtils, Page } from "../utils/navUtils";
import { ScrollToTop } from "./common/scrollToTop";
import { Login } from "./general/login";
import { PageFrame } from "./general/pageFrame";
import { StaticContent } from "./general/staticContent";
import { getGlobalServices } from "../services/services";
import { SearchPage } from "./searchPage/searchPage";
import { SurgeryPage } from "./surgeryPage/surgeryPage";

export function MainApp() {
    const currentUser = useSelector(selectCurrentUser);
    const history = useHistory();

    /** Log screen views when the path changes */
    React.useEffect(() => {
        getGlobalServices()?.firebaseAnalyticsService.logPageView(); // log the first page visit
        history.listen(() => {
            getGlobalServices()?.firebaseAnalyticsService.logPageView();
        });
    }, [history]);

    const renderHomeRoute = () => <Redirect to={NavUtils.getNavUrl[Page.Kereses]()} />;

    const renderSearchRoute = () => (
        <PageFrame title={NavUtils.getNavUrlSimpleTitle[Page.Kereses]}>
            <SearchPage />
        </PageFrame>
    );

    const renderSurgeryRoute = () => (
        <PageFrame title={NavUtils.getNavUrlSimpleTitle[Page.Rendelo]}>
            <SurgeryPage />
        </PageFrame>
    );

    const renderRouteAuth = ({ location }: RouteComponentProps<any>) => {
        if (currentUser !== undefined) {
            return <Redirect to={NavUtils.getNavUrl[Page.Kezdolap]()} />;
        }
        const { redirectUrl } = NavUtils.getNavUrlQueryParams[Page.Bejelentkezes](location.search);
        return (
            <PageFrame title={NavUtils.getNavUrlSimpleTitle[Page.Bejelentkezes]}>
                <Login redirectUrl={redirectUrl} />
            </PageFrame>
        );
    };

    return (
        <DocumentTitle title={NavUtils.getNavUrlSimpleTitle[Page.Kezdolap]}>
            <ScrollToTop>
                <AppContainer>
                    <AppContent>
                        <Switch>
                            <Route
                                exact
                                path={NavUtils.getNavUrlTemplate[Page.Kezdolap]()}
                                render={renderHomeRoute}
                            />
                            <Route
                                exact
                                path={NavUtils.getNavUrlTemplate[Page.Bejelentkezes]()}
                                render={renderRouteAuth}
                            />
                            <Route
                                exact
                                path={NavUtils.getNavUrlTemplate[Page.FelhasznalasiFeltetelek]()}
                                render={() => (
                                    <PageFrame
                                        title={NavUtils.getNavUrlSimpleTitle[Page.FelhasznalasiFeltetelek]}
                                    >
                                        <StaticContent type="terms of service" />
                                    </PageFrame>
                                )}
                            />
                            <Route
                                exact
                                path={NavUtils.getNavUrlTemplate[Page.AdatvedelmiNyilatkozat]()}
                                render={() => (
                                    <PageFrame
                                        title={NavUtils.getNavUrlSimpleTitle[Page.AdatvedelmiNyilatkozat]}
                                    >
                                        <StaticContent type="privacy policy" />
                                    </PageFrame>
                                )}
                            />
                            <Route
                                path={NavUtils.getNavUrlTemplate[Page.Kereses]()}
                                render={renderSearchRoute}
                            />
                            <Route
                                path={NavUtils.getNavUrlTemplate[Page.Rendelo]()}
                                render={renderSurgeryRoute}
                            />
                            <Route render={() => <Redirect to={NavUtils.getNavUrl[Page.Kezdolap]()} />} />
                        </Switch>
                    </AppContent>
                </AppContainer>
            </ScrollToTop>
        </DocumentTitle>
    );
}

// Styles
const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const AppContent = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
`;
