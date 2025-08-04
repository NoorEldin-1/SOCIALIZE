import {
  CircularProgress,
  Typography,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { showDialog } from "../features/dialogSlice";
import PostCard from "./PostCard";

const ProfilePosts = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [liked, setLiked] = useState(false);
  const posts = useSelector((state) => state.post.profilePosts);
  const profilePostsLoading = useSelector(
    (state) => state.post.profilePostsLoading
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const cardMenu = useMemo(() => {
    return (
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          list: {
            sx: {
              minWidth: "200px",
              textTransform: "capitalize",
            },
          },
        }}
        sx={{ mt: 1 }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            dispatch(showDialog("delete post"));
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography flexGrow={1}>delete post</Typography>
          <DeleteForeverIcon />
        </MenuItem>
      </Menu>
    );
  }, [anchorEl, dispatch, open]);

  useEffect(() => {
    if (posts.length > 0) {
      setList(
        posts.map((e) => {
          return (
            <PostCard
              key={e.id}
              e={e}
              setAnchorEl={setAnchorEl}
              place={"profilePosts"}
              liked={liked}
              setLiked={setLiked}
            />
          );
        })
      );
    }
  }, [liked, posts]);

  const element = useMemo(() => {
    return (
      <>
        {profilePostsLoading === "true" ? (
          <CircularProgress />
        ) : posts.length > 0 ? (
          list
        ) : (
          <Typography
            variant="h6"
            color={theme.palette.getContrastText(
              theme.palette.background.default
            )}
            py={1}
            px={5}
            bgcolor={theme.palette.background.default}
            borderRadius={50}
            textTransform={"uppercase"}
          >
            no posts
          </Typography>
        )}
        {cardMenu}
      </>
    );
  }, [cardMenu, list, posts.length, profilePostsLoading, theme.palette]);

  return element;
};

export default ProfilePosts;
