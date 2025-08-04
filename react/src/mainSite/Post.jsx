import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  ButtonBase,
  Avatar,
  Box,
  Tabs,
  Tab,
  useTheme,
  Button,
} from "@mui/material";
import { Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { forwardRef, useState } from "react";
import Comments from "./Comments";
import Likes from "./Likes";
import Shares from "./Shares";
import { useDispatch, useSelector } from "react-redux";
import { showDialog } from "../features/dialogSlice";
import { useNavigate } from "react-router";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import { showSecondDialog } from "../features/secondDialogSlice";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Post = () => {
  const [value, setValue] = useState("comments");
  const handleChange = (event, newValue) => setValue(newValue);
  const dispatch = useDispatch();
  const dialog = useSelector((state) => state.dialog);
  const theme = useTheme();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const postInfo = useSelector((state) => state.post.postInfo);
  return (
    <Dialog
      fullScreen
      open={dialog === "post"}
      onClose={() => dispatch(showDialog("no dialog"))}
      slots={{
        transition: Transition,
      }}
    >
      <AppBar
        sx={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: "55px",
          overflow: "hidden",
          justifyContent: "center",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
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
                src="https://i.pinimg.com/736x/c9/0f/84/c90f844b8628abee777470f40d22c38f.jpg"
                sx={{
                  width: "30px",
                  height: "30px",
                  border: `1px solid ${theme.palette.primary.main}`,
                }}
              />
            </ButtonBase>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="caption" fontWeight={"bold"}>
                name
              </Typography>
              <Typography variant="caption">@username</Typography>
            </Box>
          </Box>
          <IconButton
            size="small"
            color="inherit"
            onClick={() => dispatch(showDialog("no dialog"))}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          width: "100%",
          height: "250px",
          mt: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
          }}
          src={postInfo.image}
          alt="post"
        />
      </Box>
      <Typography p={2} sx={{ wordBreak: "break-word", maxWidth: "600px" }}>
        {postInfo.content}
      </Typography>
      <Box display="flex" gap={1} p={2}>
        <Button
          size="small"
          startIcon={liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          onClick={() => setLiked(!liked)}
        >
          120
        </Button>
        <Button
          size="small"
          startIcon={<ShareIcon />}
          onClick={() => dispatch(showSecondDialog("share"))}
        >
          10
        </Button>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab value="comments" label="comments" />
          <Tab value="likes" label="likes" />
          <Tab value="shares" label="shares" />
        </Tabs>
      </Box>
      {value === "comments" && <Comments />}
      {value === "likes" && <Likes />}
      {value === "shares" && <Shares />}
    </Dialog>
  );
};
export default Post;
