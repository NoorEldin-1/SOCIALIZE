import { Container } from "@mui/material";
import AppBar from "./AppBar";
import WhatDialog from "./WhatDialog";
import Navigation from "./Navigation";
import ForYou from "./ForYou";
import Following from "./Following";
import Community from "./Community";
import { Route, Routes } from "react-router";
import Profile from "./Profile";
import { useState } from "react";
import WhatSecondDialog from "./WhatSecondDialog";

const MainSite = () => {
  const [value, setValue] = useState(1);

  return (
    <Container
      fixed
      sx={{
        minHeight: "100vh",
        zIndex: 100,
        position: "relative",
      }}
    >
      <AppBar setValue={setValue} />
      <WhatDialog />
      <WhatSecondDialog />
      <Routes>
        <Route path="/" element={<Community />} />
        <Route path="/for-you" element={<ForYou />} />
        <Route path="/following" element={<Following />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Navigation value={value} setValue={setValue} />
    </Container>
  );
};

export default MainSite;
