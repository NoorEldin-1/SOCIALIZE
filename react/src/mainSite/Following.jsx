import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
import { followingPosts, nextFollowingPosts } from "../features/postSlice";
import { translate } from "../main";

const Following = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const posts = useSelector((state) => state.post.followingPosts);
  const loading = useSelector((state) => state.post.followingPostsLoading);
  const nextPage = useSelector((state) => state.post.nextFollowingPosts);
  const paginateLoading = useSelector((state) => state.post.paginateLoading);

  useEffect(() => {
    dispatch(followingPosts());
  }, [dispatch]);

  useEffect(() => {
    if (posts.length > 0 && loading === "false") {
      setList(
        posts.map((e) => {
          return <PostCard place="following" e={e} key={e.id} />;
        })
      );
    }
  }, [dispatch, loading, posts, theme.palette.primary.main]);

  const handlePaginate = useCallback(() => {
    if (nextPage && paginateLoading === "false") {
      if (
        Math.ceil(window.scrollY + document.documentElement.clientHeight) >=
        document.documentElement.scrollHeight
      ) {
        dispatch(nextFollowingPosts(nextPage));
      }
    }
  }, [dispatch, nextPage, paginateLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handlePaginate);
    return () => window.removeEventListener("scroll", handlePaginate);
  }, [handlePaginate]);

  const element = useMemo(() => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
          py: 10,
        }}
      >
        {loading === "true" ? (
          <CircularProgress />
        ) : posts.length > 0 ? (
          <>
            {list}
            {paginateLoading === "true" && <CircularProgress />}
          </>
        ) : paginateLoading === "true" ? null : (
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
      </Box>
    );
  }, [
    list,
    loading,
    paginateLoading,
    posts.length,
    theme.palette.primary.dark,
    theme.palette.primary.light,
  ]);

  return element;
};

export default Following;
