import { Box, Button, Typography, useTheme } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { translate } from "../main";
import { useNavigate } from "react-router";
import { useMemo } from "react";

const Landing = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const element = useMemo(() => {
    return (
      <Box
        sx={{
          zIndex: 10,
          position: "relative",
          height: "100%",
          width: "100%",
          display: "grid",
          placeContent: "center",
        }}
      >
        <img
          src="../public/logo.png"
          alt=""
          style={{ width: "300px", margin: "0 auto" }}
        />
        <Typography
          color={theme.palette.getContrastText(
            theme.palette.background.default
          )}
          mt={"-40px"}
          align="center"
          textTransform={"capitalize"}
          fontWeight={"bold"}
          variant="h6"
        >
          {translate("socialize is a developers community.")}
        </Typography>

        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{ width: "fit-content", mx: "auto", fontWeight: "bold" }}
          onClick={() => navigate("/login")}
        >
          {translate("get start")}
        </Button>
      </Box>
    );
  }, [navigate, theme.palette]);
  return element;
};

export default Landing;
