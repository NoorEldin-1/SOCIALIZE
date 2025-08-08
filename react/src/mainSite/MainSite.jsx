import { Container } from "@mui/material";
import { Route, Routes } from "react-router";
import Navigation from "./Navigation";
import AppBar from "./AppBar";
import WhatDialog from "./WhatDialog";
import ForYou from "./ForYou";
import Following from "./Following";
import Profile from "./Profile";
import { useMemo, useState } from "react";

const MainSite = () => {
  const [value, setValue] = useState(1);

  const element = useMemo(() => {
    return (
      <Container
        fixed
        sx={{
          zIndex: 100,
          position: "relative",
        }}
      >
        <AppBar setValue={setValue} />
        <WhatDialog />
        <Routes>
          <Route path="/" element={<Profile place={"myProfile"} />} />
          <Route path="/for-you" element={<ForYou />} />
          <Route path="/following" element={<Following />} />
          <Route
            path="/profile/:username?"
            element={<Profile place={"anotherProfile"} />}
          />
        </Routes>
        <Navigation value={value} setValue={setValue} />
      </Container>
    );
  }, [value]);

  return element;
};

export default MainSite;
