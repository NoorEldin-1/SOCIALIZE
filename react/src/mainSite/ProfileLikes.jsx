import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import PostCard from "./PostCard";
import { nextLikesPosts, userLikes } from "../features/postSlice";
import { translate } from "../main";

const ProfileLikes = ({ place }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userLikesPosts = useSelector((state) => state.post.userLikes);
  const userLikesLoading = useSelector((state) => state.post.userLikesLoading);
  const [list, setList] = useState([]);
  const { username } = useParams();
  const nextPage = useSelector((state) => state.post.nextLikesPosts);
  const paginateLoading = useSelector((state) => state.post.paginateLoading);

  useEffect(() => {
    if (username) {
      dispatch(userLikes(username));
    } else {
      dispatch(userLikes(window.localStorage.getItem("username")));
    }
  }, [dispatch, username]);

  useEffect(() => {
    if (userLikesPosts.length > 0 && userLikesLoading === "false") {
      setList(
        userLikesPosts.map((e) => {
          return <PostCard key={e.id} e={e} place={place} />;
        })
      );
    }
  }, [place, userLikesLoading, userLikesPosts]);

  const handlePaginate = useCallback(() => {
    if (nextPage && paginateLoading === "false") {
      if (
        Math.ceil(window.scrollY + document.documentElement.clientHeight) >=
        document.documentElement.scrollHeight
      ) {
        dispatch(nextLikesPosts(nextPage));
      }
    }
  }, [dispatch, nextPage, paginateLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handlePaginate);
    return () => window.removeEventListener("scroll", handlePaginate);
  }, [handlePaginate]);

  const element = useMemo(() => {
    if (userLikesLoading === "true") {
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      );
    } else {
      if (userLikesPosts.length > 0 && userLikesLoading === "false") {
        return <>{list}</>;
      } else {
        return (
          <Typography
            variant="h6"
            color={theme.palette.primary.dark}
            py={1}
            px={5}
            bgcolor={theme.palette.primary.light}
            borderRadius={50}
            textTransform={"uppercase"}
          >
            {translate("no likes yet")}
          </Typography>
        );
      }
    }
  }, [
    list,
    theme.palette.primary.dark,
    theme.palette.primary.light,
    userLikesLoading,
    userLikesPosts.length,
  ]);

  return element;
};

export default ProfileLikes;
