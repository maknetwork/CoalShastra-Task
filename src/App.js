import logo from "./logo.svg";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import MarketDetails from "./containers/MarketDetails";
const theme = createTheme({
  spacing: 4,

  palette: {
    primary: {
      main: "#2959BA", // Replace with your desired primary color
    },
  },
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#2959BA",
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        className={classes.appBar}
        sx={{ paddingX: 0 }}
        elevation={0}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            CoalShastra
          </Typography>
        </Toolbar>
      </AppBar>

      <MarketDetails></MarketDetails>
    </ThemeProvider>
  );
}

export default App;
