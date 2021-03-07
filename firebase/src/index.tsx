import "es6-shim";

import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Store } from "redux";
import { ThemeProvider } from "styled-components";
import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles";
import { MainApp } from "./components/mainApp";
import * as mixins from "./mixins";
import { initializeAndGetClientSideServices } from "./services/services";
import { createAppStore } from "./store/store";
import { THEME } from "./utils/themeUtils";
import { DataLoaders } from "./components/data-loaders/dataLoaders";

const store = createAppStore();
initializeAndGetClientSideServices(store);

const styledComponentsTheme = { ...THEME, mixins: { ...THEME.mixins, ...mixins } };

renderApp(MainApp);

// Hot reload
if (module.hot) {
    module.hot.accept("./components/mainApp", () => {
        // eslint-disable-next-line global-require
        renderApp(require("./components/mainApp").MainApp);
    });
}

function renderApp(AppComponent: React.ReactType) {
    const WrappedApp = (
        <MuiThemeProvider theme={THEME}>
            <ThemeProvider theme={styledComponentsTheme}>
                <StylesProvider injectFirst>
                    <BrowserRouter>
                        <Provider store={store as Store<any>}>
                            <CssBaseline />
                            <AppComponent />
                            <DataLoaders />
                        </Provider>
                    </BrowserRouter>
                </StylesProvider>
            </ThemeProvider>
        </MuiThemeProvider>
    );

    ReactDOM.render(WrappedApp, document.getElementById("app"));
}
