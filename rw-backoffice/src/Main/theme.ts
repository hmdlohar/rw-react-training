import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: "#cc22aa",
        },
        secondary: {
            main: "#1122aa",
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: "contained",
            },
        }
    }
});

