import "./App.css";
import Landing from "./landing/Landing";
import { Route, Routes } from "react-router";
import MainSite from "./mainSite/MainSite";
import Login from "./register/Login";
import Signup from "./register/Signup";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "#3c3c3c"
          : "#edf2fa",
        position: "relative",
      }}
    >
      <div
        style={{
          backgroundImage: `
        linear-gradient(to right, #e2e8f0 1px, transparent 1px),
        linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
      `,
          backgroundSize: "20px 30px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          position: "absolute",
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
        </Routes>
      )}
    </div>
  );
}

export default App;
