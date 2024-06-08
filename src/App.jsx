import { useState } from "react";
import Layout from "./components/layout/Layout";
import { ThemeProvider, createTheme } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import ClientErrorPage from "./components/layout/ClientErrorPage";
import { SiteConsts } from "./components/layout/SiteConsts";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
  typography: {
    allVariants: {
      fontFamily: SiteConsts.FONT_KEY_GLOBAL_1,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          border: "2px solid",
          ":hover": {
            //backgroundColor: "#dedede",
            border: "2px solid",
          },
        },
      },
    },
  },
});

function App() {
  return (
    <>
      <ErrorBoundary fallback={<ClientErrorPage />}>
        <ThemeProvider theme={theme}>
          <Layout />
        </ThemeProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
