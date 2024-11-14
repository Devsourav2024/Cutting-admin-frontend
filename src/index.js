import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
// 1. Import the extendTheme function
import { extendTheme, ChakraProvider } from "@chakra-ui/react";

import { AuthContextProvider } from "./context/authContextProvider";
import App from "./App";

import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/css/grid.css";
import "./assets/css/theme.css";
import "./assets/css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";

document.title = "ADMIN PANEL";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme(colors);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
