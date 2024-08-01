import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#FF6F61",
    },
    secondary: {
      main: "#FFB88C",
    },
    background: {
      default: "#FFF5EE",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
    action: {
      active: "#6B4226",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#FF6F61",
    },
    secondary: {
      main: "#FFB88C",
    },
    background: {
      default: "#2E2E2E",
      paper: "#3A3A3A",
    },
    text: {
      primary: "#EAEAEA",
      secondary: "#BBBBBB",
    },
    action: {
      active: "#E7DACF",
    },
  },
});
