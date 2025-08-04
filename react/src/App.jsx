import "./App.css";
import Landing from "./landing/Landing";
import { Navigate, Route, Routes } from "react-router";
import MainSite from "./mainSite/MainSite";
import Login from "./register/Login";
import Signup from "./register/Signup";
import { useTheme } from "@emotion/react";

function App() {
  const theme = useTheme();
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          background: `linear-gradient(to bottom, ${theme.palette.primary.dark} 50%, ${theme.palette.primary.main})`,
          position: "fixed",
          inset: 0,
          zIndex: 0,
        }}
      />
      {window.localStorage.getItem("token") ? (
        <MainSite />
      ) : (
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
