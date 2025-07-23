import { Box, Container } from "@mui/material";
import AppBar from "./AppBar";
import WhatDialog from "./WhatDialog";

const MainSite = () => {
  return (
    <Container
      fixed
      sx={{
        minHeight: "100vh",
        zIndex: 100,
        position: "relative",
      }}
    >
      <AppBar />
      <WhatDialog />
    </Container>
  );
};

export default MainSite;
