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
import { forwardRef, useEffect, useState } from "react";
import Comments from "./Comments";
import Likes from "./Likes";
import Shares from "./Shares";
import { useDispatch, useSelector } from "react-redux";
import { showDialog } from "../features/dialogSlice";
import { useNavigate } from "react-router";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  postComments,
  postLikes,
  postShares,
  toggleLike,
  toggleShare,
} from "../features/postSlice";
import { reset } from "../features/authSlice";
import { translate } from "../main";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Post = ({ place }) => {
  const [value, setValue] = useState("comments");
  const handleChange = (event, newValue) => {
    if (newValue === "likes") {
      dispatch(postLikes(postInfo.id));
    }
    if (newValue === "shares") {
      dispatch(postShares(postInfo.id));
    }
    setValue(newValue);
  };
  const dispatch = useDispatch();
  const dialog = useSelector((state) => state.dialog);
  const theme = useTheme();
  const navigate = useNavigate();
  const postInfo = useSelector((state) => state.post.postInfo);

  const [like, setLike] = useState(postInfo.liked);
  const [share, setShare] = useState(postInfo.shared);
  const [likesCount, setLikesCount] = useState(postInfo.likes_count);
  const [sharesCount, setSharesCount] = useState(postInfo.shares_count);

  useEffect(() => {
    dispatch(postComments(postInfo.id));
  }, [dispatch, postInfo.id]);

  if (place === "forYou") {
    const handleLike = () => {
      dispatch(toggleLike(postInfo.id));
      if (like) {
        setLikesCount(likesCount - 1);
      } else {
        setLikesCount(likesCount + 1);
      }
      setLike(!like);
    };

    const handleShare = () => {
      dispatch(toggleShare(postInfo.id));
      if (share) {
        setSharesCount(sharesCount - 1);
      } else {
        setSharesCount(sharesCount + 1);
      }
      setShare(!share);
    };

    return (
      <Dialog
        fullScreen
        sx={{
          "& .MuiDialog-paper": {
            bgcolor: theme.palette.primary.dark,
          },
        }}
        open={dialog === "forYouPost"}
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
                  navigate(`/profile/${postInfo.user.username}`);
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
                  src={
                    postInfo.user.profileImage
                      ? postInfo.user.profileImage
                      : "../../public/guest.png"
                  }
                  sx={{
                    width: "30px",
                    height: "30px",
                    border: `1px solid ${theme.palette.primary.main}`,
                  }}
                />
              </ButtonBase>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="caption" fontWeight={"bold"}>
                  {postInfo.user.name}
                </Typography>
                <Typography variant="caption">
                  {postInfo.user.username}
                </Typography>
              </Box>
            </Box>
            <IconButton
              size="small"
              color="inherit"
              onClick={() => {
                dispatch(reset());
                dispatch(showDialog("no dialog"));
              }}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {postInfo.image && (
          <Box
            sx={{
              width: "100%",
              height: "300px",
              mt: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
              src={postInfo.image}
              alt="post"
            />
          </Box>
        )}
        <Typography
          p={2}
          sx={{
            wordBreak: "break-word",
            maxWidth: "600px",
            color: theme.palette.primary.light,
          }}
        >
          {postInfo.content}
        </Typography>
        <Box display="flex" gap={1} p={2} alignItems={"center"}>
          <Button
            size="small"
            startIcon={like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            onClick={handleLike}
          >
            {likesCount}
          </Button>
          <Button
            size="small"
            startIcon={
              share ? <BookmarkIcon /> : <BookmarkBorderOutlinedIcon />
            }
            onClick={handleShare}
          >
            {sharesCount}
          </Button>
          <Typography
            variant="body2"
            color="primary"
            fontWeight={"bold"}
            fontStyle={"italic"}
          >
            {postInfo.created_at}
          </Typography>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab
              value="comments"
              label={translate("comments")}
              sx={{ color: theme.palette.primary.light }}
            />
            <Tab
              value="likes"
              label={translate("likes")}
              sx={{ color: theme.palette.primary.light }}
            />
            <Tab
              value="shares"
              label={translate("shares")}
              sx={{ color: theme.palette.primary.light }}
            />
          </Tabs>
        </Box>
        {value === "comments" && <Comments />}
        {value === "likes" && <Likes />}
        {value === "shares" && <Shares />}
      </Dialog>
    );
  } else if (place === "myPost") {
    return (
      <Dialog
        fullScreen
        sx={{
          "& .MuiDialog-paper": {
            bgcolor: theme.palette.primary.dark,
          },
        }}
        open={dialog === "myPost"}
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
              onClick={() => {
                dispatch(reset());
                dispatch(showDialog("no dialog"));
              }}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {postInfo.image && (
          <Box
            sx={{
              width: "100%",
              height: "300px",
              mt: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
              src={postInfo.image}
              alt="post"
            />
          </Box>
        )}
        <Typography
          p={2}
          sx={{
            wordBreak: "break-word",
            maxWidth: "600px",
            color: theme.palette.primary.light,
          }}
        >
          {postInfo.content}
        </Typography>
        <Box display="flex" gap={1} p={2} alignItems={"center"}>
          <Typography
            variant="body2"
            color="primary"
            fontWeight={"bold"}
            fontStyle={"italic"}
          >
            {postInfo.created_at}
          </Typography>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab
              value="comments"
              label={translate("comments")}
              sx={{ color: theme.palette.primary.light }}
            />
            <Tab
              value="likes"
              label={translate("likes")}
              sx={{ color: theme.palette.primary.light }}
            />
            <Tab
              value="shares"
              label={translate("shares")}
              sx={{ color: theme.palette.primary.light }}
            />
          </Tabs>
        </Box>
        {value === "comments" && <Comments />}
        {value === "likes" && <Likes />}
        {value === "shares" && <Shares />}
      </Dialog>
    );
  }
};
export default Post;
