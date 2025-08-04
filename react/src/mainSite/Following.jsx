import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";

const Following = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [liked, setLiked] = useState(false);
  const posts = useSelector((state) => state.post.followingPosts);
  const loading = useSelector((state) => state.post.followingPostsLoading);

  useEffect(() => {
    setList(
      posts.map((e) => {
        return (
          <PostCard
            place="following"
            e={e}
            key={e.id}
            liked={liked}
            setLiked={setLiked}
          />
        );
      })
    );
  }, [dispatch, liked, posts, theme.palette.primary.main]);

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
          <>{list}</>
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
            No posts
          </Typography>
        )}
      </Box>
    );
  }, [list, loading, posts.length, theme.palette]);

  return element;
};

export default Following;
