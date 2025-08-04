import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { createTheme, ThemeProvider } from "@mui/material";

export const backendUrl = "http://localhost:8000/api/";
export const fileUrl = "http://localhost:8000";

if (window.navigator.language === "ar") {
  document.dir = "rtl";
} else {
  document.dir = "ltr";
}

const theme = createTheme({
  direction: document.dir,
  typography: {
    fontFamily: "Rubik",
  },
  palette: {
    primary: {
      main: "#285BF6",
      light: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "#FEFEFE"
        : "#525252",
      dark: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "#525252"
        : "#FEFEFE",
    },
    secondary: {
      main: "#285BF6",
      light: "#FEFEFE",
      dark: "#525252",
    },
  },
});

const englishWords = [
  "get start", // 0
  "socialize is a developers community.", // 1
];
const arabicWords = [];
export const translate = (word) => {
  const index = englishWords.indexOf(word);
  if (document.dir === "rtl") {
    return arabicWords[index];
  } else {
    return englishWords[index];
  }
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
