import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563EB",
    },
    secondary: {
      main: "#0EA5E9",
    },
    background: {
      default: "#F5F7FB",
      paper: "#FFFFFF",
    },
  },

  typography: {
    fontFamily: "'Poppins', sans-serif",
  },

  shape: {
    borderRadius: 12,
  },
});

export default theme;