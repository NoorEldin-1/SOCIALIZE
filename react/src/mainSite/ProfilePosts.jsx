import {
  CircularProgress,
  Typography,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { showDialog } from "../features/dialogSlice";
import PostCard from "./PostCard";
import { nextProfilePosts, profilePosts } from "../features/postSlice";
import { useParams } from "react-router";
import { translate } from "../main";

const ProfilePosts = ({ place }) => {
  const { username } = useParams();
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
  const nextPage = useSelector((state) => state.post.nextProfilePosts);
  const paginateLoading = useSelector((state) => state.post.paginateLoading);



  useEffect(() => {
    if (username && username !== window.localStorage.getItem("username")) {
      dispatch(profilePosts(username));
    } else {
      dispatch(profilePosts(window.localStorage.getItem("username")));
    }
  }, [dispatch, username]);

  const handlePaginate = useCallback(() => {
    if (nextPage && paginateLoading === "false") {
      if (
        Math.ceil(window.scrollY + document.documentElement.clientHeight) >=
        document.documentElement.scrollHeight
      ) {
        dispatch(nextProfilePosts(nextPage));
      }
    }
  }, [dispatch, nextPage, paginateLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handlePaginate);
    return () => window.removeEventListener("scroll", handlePaginate);
  }, [handlePaginate]);

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
              backgroundColor: theme.palette.primary.dark,
              color: theme.palette.primary.light,
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
          <Typography flexGrow={1}>{translate("delete post")}</Typography>
          <DeleteForeverIcon sx={{ color: theme.palette.primary.light }} />
        </MenuItem>
      </Menu>
    );
  }, [
    anchorEl,
    dispatch,
    open,
    theme.palette.primary.dark,
    theme.palette.primary.light,
  ]);

  useEffect(() => {


    if (posts.length > 0 && profilePostsLoading === "false") {
      setList(
        posts.map((e) => {
          return (
            <PostCard
              key={e.id}
              e={e}
              setAnchorEl={setAnchorEl}
              place={place}
              liked={liked}
              setLiked={setLiked}
            />
          );
        })
      );
    }
  }, [liked, place, posts, profilePostsLoading]);

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
            color={theme.palette.primary.dark}
            py={1}
            px={5}
            bgcolor={theme.palette.primary.light}
            borderRadius={50}
            textTransform={"uppercase"}
          >
            {translate("no posts")}
          </Typography>
        )}
        {cardMenu}
      </>
    );
  }, [
    cardMenu,
    list,
    posts.length,
    profilePostsLoading,
    theme.palette.primary.dark,
    theme.palette.primary.light,
  ]);

  return element;
};

export default ProfilePosts;
