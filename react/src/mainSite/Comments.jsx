import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router";
import { showDialog } from "../features/dialogSlice";
import { useDispatch } from "react-redux";

const Comments = () => {
  const theme = useTheme();
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box sx={{ p: 2, position: "relative", width: "100%" }}>
      <Box sx={{ mb: 2, mt: 1, display: "flex", gap: 1, alignItems: "center" }}>
        <TextField
          fullWidth
          multiline
          maxRows={3}
          size="medium"
          variant="outlined"
          label="Add a comment"
          slotProps={{
            input: { startAdornment: <ModeCommentIcon sx={{ mr: 2 }} /> },
          }}
        />
        <IconButton size="large" color="primary">
          <SendIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            bgcolor: theme.palette.background.default,
            p: 2,
            borderRadius: 5,
            width: "fit-content",
            maxWidth: { xs: "275px", sm: "400px" },
            boxShadow: 5,
            border: `2px solid ${theme.palette.primary.main}`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
            <Typography variant="caption">@username</Typography>
            <Typography
              variant="caption"
              fontWeight={"bold"}
              flexGrow={1}
              align="right"
              fontStyle={"italic"}
              color="primary"
            >
              just now
            </Typography>
          </Box>
          <Box sx={{ pl: 4 }}>
            <Typography sx={{ wordBreak: "break-word" }}>
              comment kdkjakdja kasjdkajskd kajsdkjaksd Lorem ipsum dolor
              sitaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              amet consectetur adipisicing elit. Ab tenetur in explicabo odio
              voluptatum m
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              size="small"
              startIcon={liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              onClick={() => setLiked(!liked)}
            >
              120
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Comments;
