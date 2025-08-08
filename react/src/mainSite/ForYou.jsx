import { Box, Typography, useTheme, CircularProgress } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
import { forYouPosts, nextForYouPosts } from "../features/postSlice";
import { translate } from "../main";

const ForYou = () => {
  const theme = useTheme();
  const posts = useSelector((state) => state.post.forYouPosts);
  const loading = useSelector((state) => state.post.forYouPostsLoading);
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const nextPage = useSelector((state) => state.post.nextForYouPosts);
  const paginateLoading = useSelector((state) => state.post.paginateLoading);

  useEffect(() => {
    dispatch(forYouPosts());
  }, [dispatch]);

  const handlePaginate = useCallback(() => {
    if (nextPage && paginateLoading === "false") {
      if (
        Math.ceil(window.scrollY + document.documentElement.clientHeight) >=
        document.documentElement.scrollHeight
      ) {
        dispatch(nextForYouPosts(nextPage));
      }
    }
  }, [dispatch, nextPage, paginateLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handlePaginate);
    return () => window.removeEventListener("scroll", handlePaginate);
  }, [handlePaginate]);

  useEffect(() => {
    if (posts.length > 0 && loading === "false") {
      setList(
        posts.map((e) => {
          return <PostCard key={e.id} place={"forYou"} e={e} />;
        })
      );
    }
  }, [loading, posts]);

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

export default ForYou;
