import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App";
import { Provider } from "react-redux";
import store from "./store/index";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5c6364",
      extra: "#3a5157",
      light: "#F3E0DC",
      dark: "#5085A5",
    },
    secondary: {
      main: "#31708E",

      light: "#BC4639",
      dark: "#FFCCBC",
    },
    third: {
      main: "#5c6364",
      light: "#F7F9FB",
      extra: "#e1faff",
      dark: "#5085A5",
    },
    fourth: {
      main: "#4285F4",
      light: "#f0fffd",
      dark: "#5DA2D5",
    },

    fifth: {
      main: "#8FC1E3",
      light: "#caeeff",
      dark: "#5085A5",
    },
  },
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
