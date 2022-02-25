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
        },
        MuiTextField: {
            defaultProps: {
                fullWidth: true,
                size: "small"
            }
        },
        //@ts-ignore
        MuiLoadingButton: {
            // styleOverrides: {
            //   contained: {
            //     borderRadius: 0,
            //     boxShadow: "none",
            //     textShadow: "0px 0px 2px white",
            //   },
            // },
            defaultProps: {
                variant: "contained",
                color: "primary",
                fullWidth: true
            },
        },
    }
});

