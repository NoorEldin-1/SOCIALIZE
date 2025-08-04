import { Container } from "@mui/material";
import AppBar from "./AppBar";
import WhatDialog from "./WhatDialog";
import Navigation from "./Navigation";
import ForYou from "./ForYou";
import Following from "./Following";
import { Route, Routes } from "react-router";
import Profile from "./Profile";
import { useEffect, useMemo, useState } from "react";
import WhatSecondDialog from "./WhatSecondDialog";
import { followingPosts, forYouPosts } from "../features/postSlice";
import { useDispatch } from "react-redux";
import AnotherProfile from "./AnotherProfile";

const MainSite = () => {
  const [value, setValue] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(forYouPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(followingPosts());
  }, [dispatch]);

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
        <WhatSecondDialog />
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/for-you" element={<ForYou />} />
          <Route path="/following" element={<Following />} />
          <Route path="/profile/:username?" element={<AnotherProfile />} />
        </Routes>
        <Navigation value={value} setValue={setValue} />
      </Container>
    );
  }, [value]);

  return element;
};

export default MainSite;
