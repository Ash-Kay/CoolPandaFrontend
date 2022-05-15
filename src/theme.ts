import { createTheme, ThemeOptions } from "@mui/material/styles";

const commonProps = {
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "20px",
        },
      },
    },
  },
};

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5CDB95",
    },
    secondary: {
      main: "#05386B",
    },
    background: {
      default: "#f5f8fd",
    },
  },
  ...(commonProps as ThemeOptions),
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#67b094",
    },
    secondary: {
      main: "#ff5252",
    },
    background: {
      default: "#262731",
      paper: "#33333b",
    },
    error: {
      main: "#d50000",
    },
  },
  ...(commonProps as ThemeOptions),
});

export default lightTheme;
