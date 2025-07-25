import { Avatar, Box, ButtonBase, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { showDialog } from "../features/dialogSlice";

const Likes = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        p: 2,
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box
        sx={{
          bgcolor: theme.palette.background.default,
          p: 2,
          borderRadius: 50,
          maxWidth: "300px",
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
          boxShadow: 5,
          border: `2px solid ${theme.palette.primary.main}`,
        }}
      >
        <ButtonBase
          onClick={() => {
            navigate("/profile");
            dispatch(showDialog("no dialog"));
          }}
          component="label"
          role={undefined}
          tabIndex={-1}
          sx={{
            cursor: "pointer",
            borderRadius: "40px",
            "&:has(:focus-visible)": {
              outline: "2px solid",
              outlineOffset: "2px",
            },
          }}
        >
          <Avatar
            alt="guest"
            src="../../public/guest.png"
            sx={{
              width: "25px",
              height: "25px",
              border: `1px solid ${theme.palette.primary.main}`,
            }}
          />
        </ButtonBase>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption">full name</Typography>
          <Typography variant="caption">@username</Typography>
        </Box>
        <Typography
          variant="caption"
          color="primary"
          flexGrow={1}
          align="right"
          fontWeight={"bold"}
          fontStyle={"italic"}
        >
          just now
        </Typography>
      </Box>
    </Box>
  );
};

export default Likes;
