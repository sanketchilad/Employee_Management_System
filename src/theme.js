import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#003366",
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: "#003366",
          border: "1px solid #003366",
          "&:hover": {
            background: "#335c85",
          },
        },
        outlined: {
          background: "#fff",
          "&:hover": {
            backgroundColor: "#f2f2f2",
            transition: "all 0.3s ease",
          },
        },
      },
    },
  },
});

export default theme;