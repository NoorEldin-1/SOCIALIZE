import { useDispatch, useSelector } from "react-redux";
import { showDialog } from "../features/dialogSlice";
import { forwardRef, useState } from "react";
import { Slide } from "@mui/material";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Dialog,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Comments from "./Comments";
import Likes from "./Likes";
import Shares from "./Shares";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MainPost = () => {
  const [value, setValue] = useState("comments");
  const handleChange = (_, newValue) => setValue(newValue);
  const dispatch = useDispatch();
  const dialog = useSelector((state) => state.dialog);
  const postInfo = useSelector((state) => state.post.postInfo);

  return (
    <Dialog
      fullScreen
      open={dialog === "main post"}
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
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <IconButton
            size="small"
            color="inherit"
            onClick={() => dispatch(showDialog("no dialog"))}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {postInfo.image && (
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
      )}
      <Typography p={2} sx={{ wordBreak: "break-word", maxWidth: "600px" }}>
        {postInfo.content}
      </Typography>
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

export default MainPost;
