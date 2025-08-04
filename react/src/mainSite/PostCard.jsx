import { useTheme } from "@emotion/react";
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
} from "@mui/material";
import { Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import ShareIcon from "@mui/icons-material/Share";
import { changePostInfo } from "../features/postSlice";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate, useParams } from "react-router";

const PostCard = ({ e, setAnchorEl, liked, setLiked, place }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { username } = useParams();
  const navigate = useNavigate();

  if (place === "forYou") {
    return (
      <Card
        sx={{
          width: 300,
          height: 325,
          display: "flex",
          flexDirection: "column",
        }}
      >
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
            <Typography variant="caption" fontWeight={"bold"}>
              {e.user.name}
            </Typography>
            <Typography variant="caption">@{e.user.username}</Typography>
          </Box>
        </Box>
        {e.image && (
          <CardMedia
            sx={{ height: 140, cursor: "pointer" }}
            image={e.image}
            onClick={() => {
              dispatch(showDialog("main post"));
              // dispatch(changePostInfo(e));
            }}
          />
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          {e.image ? (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {e.content.length > 150
                ? `${e.content.slice(0, 150).trim()}...`
                : e.content}
            </Typography>
          ) : (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {e.content.length > 300
                ? `${e.content.slice(0, 300).trim()}...`
                : e.content}
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
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
            onClick={() => dispatch(showDialog("share"))}
          >
            10
          </Button>
          <Button
            size="small"
            startIcon={<ModeCommentIcon />}
            onClick={() => dispatch(showDialog("post"))}
          >
            10000
          </Button>
        </CardActions>
      </Card>
    );
  } else if (place === "profilePosts") {
    return (
      <Card
        sx={{
          width: 300,
          height: 300,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {!username || username === window.localStorage.getItem("username") ? (
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
            >
              <MoreHorizIcon />
            </IconButton>
          </Box>
        ) : null}

        {e.image && (
          <CardMedia
            sx={{ height: 140, cursor: "pointer" }}
            image={e.image}
            onClick={() => {
              dispatch(changePostInfo(e));
              dispatch(showDialog("main post"));
            }}
          />
        )}
        <CardContent
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => {
            dispatch(changePostInfo(e));
            dispatch(showDialog("main post"));
          }}
        >
          {e.image ? (
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", wordBreak: "break-word" }}
            >
              {e.content.length > 150
                ? `${e.content.slice(0, 150).trim()}...`
                : e.content}
            </Typography>
          ) : (
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", wordBreak: "break-word" }}
            >
              {e.content.length > 300
                ? `${e.content.slice(0, 300).trim()}...`
                : e.content}
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
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
            onClick={() => dispatch(showDialog("share"))}
          >
            10
          </Button>
          <Button
            size="small"
            startIcon={<ModeCommentIcon />}
            onClick={() => dispatch(showDialog("post"))}
          >
            10000
          </Button>
        </CardActions>
      </Card>
    );
  } else if (place === "following") {
    return (
      <Card
        sx={{
          width: 300,
          height: 325,
          display: "flex",
          flexDirection: "column",
        }}
      >
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
            <Typography variant="caption" fontWeight={"bold"}>
              {e.user.name}
            </Typography>
            <Typography variant="caption">@{e.user.username}</Typography>
          </Box>
        </Box>
        {e.image && (
          <CardMedia
            sx={{ height: 140, cursor: "pointer" }}
            image={e.image}
            onClick={() => {
              dispatch(showDialog("main post"));
              // dispatch(changePostInfo(e));
            }}
          />
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          {e.image ? (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {e.content.length > 150
                ? `${e.content.slice(0, 150).trim()}...`
                : e.content}
            </Typography>
          ) : (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {e.content.length > 300
                ? `${e.content.slice(0, 300).trim()}...`
                : e.content}
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
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
            onClick={() => dispatch(showDialog("share"))}
          >
            10
          </Button>
          <Button
            size="small"
            startIcon={<ModeCommentIcon />}
            onClick={() => dispatch(showDialog("post"))}
          >
            10000
          </Button>
        </CardActions>
      </Card>
    );
  } else if (place === "anotherProfilePosts") {
    return (
      <Card
        sx={{
          width: 300,
          height: 325,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {e.image && (
          <CardMedia
            sx={{ height: 140, cursor: "pointer" }}
            image={e.image}
            onClick={() => {
              dispatch(showDialog("main post"));
              // dispatch(changePostInfo(e));
            }}
          />
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          {e.image ? (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {e.content.length > 150
                ? `${e.content.slice(0, 150).trim()}...`
                : e.content}
            </Typography>
          ) : (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {e.content.length > 300
                ? `${e.content.slice(0, 300).trim()}...`
                : e.content}
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
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
            onClick={() => dispatch(showDialog("share"))}
          >
            10
          </Button>
          <Button
            size="small"
            startIcon={<ModeCommentIcon />}
            onClick={() => dispatch(showDialog("post"))}
          >
            10000
          </Button>
        </CardActions>
      </Card>
    );
  }
};

export default PostCard;
