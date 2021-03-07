import { createMuiTheme } from "@material-ui/core";
import environmentConfig from "../environment/environmentConfig.json";

export const THEME = createMuiTheme({
    palette: {
        type: "light",
        primary: {
            main: environmentConfig.primaryMainColor,
        },
        secondary: {
            main: environmentConfig.secondaryMainColor,
        },
    },
    // Bootstrap-style spacing
    spacing: (factor) => `${0.25 * factor}rem`,
});
