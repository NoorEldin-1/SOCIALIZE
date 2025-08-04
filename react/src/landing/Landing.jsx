import { Box, Button, Typography, useTheme } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
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
          height: "100vh",
          width: "100%",
          display: "grid",
          placeContent: "center",
          gap: "5px",
        }}
      >
        <Typography
          align="center"
          variant="h4"
          textTransform={"uppercase"}
          color={theme.palette.primary.main}
          fontWeight={"bold"}
          letterSpacing={"2px"}
        >
          socialize.
        </Typography>
        <Typography
          color={theme.palette.primary.light}
          align="center"
          textTransform={"capitalize"}
          fontWeight={"bold"}
          variant="h6"
        >
          socialize is a community for everyone.
        </Typography>

        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            width: "fit-content",
            mx: "auto",
            fontWeight: "bold",
            borderRadius: "50px",
          }}
          onClick={() => navigate("/login")}
        >
          get start
        </Button>
      </Box>
    );
  }, [navigate, theme.palette]);
  return element;
};

export default Landing;
