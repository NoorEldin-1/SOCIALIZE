import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { createTheme, ThemeProvider } from "@mui/material";

export const backendUrl = "http://localhost:8000/api/";

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
    mode: window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
    primary: {
      main: "#0976be",
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
