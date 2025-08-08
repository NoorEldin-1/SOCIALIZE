import { useDispatch } from "react-redux";
import { showDialog } from "../features/dialogSlice";
import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import { Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { changePostInfo, toggleLike, toggleShare } from "../features/postSlice";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const PostCard = ({ e, setAnchorEl, place }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [like, setLike] = useState(e.liked);
  const [share, setShare] = useState(e.shared);
  const [likesCount, setLikesCount] = useState(e.likes_count);
  const [sharesCount, setSharesCount] = useState(e.shares_count);

  useEffect(() => {
    setLike(e.liked);
    setShare(e.shared);
    setLikesCount(e.likes_count);
    setSharesCount(e.shares_count);
  }, [e.liked, e.likes_count, e.shared, e.shares_count, e]);

  const handleLike = useCallback(() => {
    dispatch(toggleLike(e.id));
    if (like) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLike(!like);
  }, [dispatch, e.id, like, likesCount]);

  const handleShare = useCallback(() => {
    dispatch(toggleShare(e.id));
    if (share) {
      setSharesCount(sharesCount - 1);
    } else {
      setSharesCount(sharesCount + 1);
    }
    setShare(!share);
  }, [dispatch, e.id, share, sharesCount]);

  const element = useMemo(() => {
    return (
      <Card
        sx={{
          width: { xs: "100%", sm: "550px" },
          minHeight: 350,
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.palette.primary.dark,
          border: `1px solid ${theme.palette.primary.light}`,
          borderRadius: 5,
        }}
      >
        {place === "myProfilePosts" ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              p: 1,
            }}
          >
            <IconButton
              size="small"
              onClick={(element) => {
                setAnchorEl(element.currentTarget);
                dispatch(changePostInfo(e));
              }}
              sx={{
                color: theme.palette.primary.light,
              }}
            >
              <MoreHorizIcon />
            </IconButton>
          </Box>
        ) : (
          <Box
            sx={{
              p: 1,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <ButtonBase
              onClick={() => navigate(`/profile/${e.user.username}`)}
              component="label"
              role={undefined}
              tabIndex={-1}
              sx={{
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
                  e.user.profileImage
                    ? e.user.profileImage
                    : "../../public/guest.png"
                }
                sx={{
                  cursor: "pointer",
                  width: "30px",
                  height: "30px",
                  border: `1px solid ${theme.palette.primary.main}`,
                }}
              />
            </ButtonBase>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="caption"
                fontWeight={"bold"}
                sx={{ color: theme.palette.primary.light }}
              >
                {e.user.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: theme.palette.primary.light }}
              >
                {e.user.username}
              </Typography>
            </Box>
          </Box>
        )}

        {e.image && (
          <CardMedia
            sx={{ height: 140, cursor: "pointer" }}
            image={e.image}
            onClick={() => {
              dispatch(changePostInfo(e));
              if (place === "myProfilePosts") {
                dispatch(showDialog("myPost"));
              } else {
                dispatch(showDialog("forYouPost"));
              }
            }}
          />
        )}

        <CardContent
          sx={{
            flexGrow: 1,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          onClick={() => {
            dispatch(changePostInfo(e));
            if (place === "myProfilePosts") {
              dispatch(showDialog("myPost"));
            } else {
              dispatch(showDialog("forYouPost"));
            }
          }}
        >
          {e.image ? (
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.primary.light,
                wordBreak: "break-word",
              }}
            >
              {e.content.length > 350
                ? `${e.content.slice(0, 350).trim()}...`
                : e.content}
            </Typography>
          ) : (
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.primary.light,
                wordBreak: "break-word",
              }}
            >
              {e.content.length > 300
                ? `${e.content.slice(0, 300).trim()}...`
                : e.content}
            </Typography>
          )}
          <Typography
            variant="caption"
            color="primary"
            display={"block"}
            textAlign="right"
            fontWeight={"bold"}
            fontStyle={"italic"}
          >
            {e.created_at}
          </Typography>
        </CardContent>

        {place !== "myProfilePosts" && (
          <CardActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
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
            <Button
              size="small"
              startIcon={<ModeCommentIcon />}
              onClick={() => {
                dispatch(changePostInfo(e));
                dispatch(showDialog("forYouPost"));
              }}
            >
              {e.comments_count}
            </Button>
          </CardActions>
        )}
      </Card>
    );
  }, [
    dispatch,
    e,
    handleLike,
    handleShare,
    like,
    likesCount,
    navigate,
    place,
    setAnchorEl,
    share,
    sharesCount,
    theme.palette.primary.dark,
    theme.palette.primary.light,
    theme.palette.primary.main,
  ]);

  return element;
};

export default PostCard;
