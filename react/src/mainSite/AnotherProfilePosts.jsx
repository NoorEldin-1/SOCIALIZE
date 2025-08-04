import { useTheme } from "@emotion/react";
import { CircularProgress, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import PostCard from "./PostCard";

const AnotherProfilePosts = () => {
  const theme = useTheme();
  //   const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [liked, setLiked] = useState(false);
  const posts = useSelector((state) => state.post.profilePosts);
  const profilePostsLoading = useSelector(
    (state) => state.post.profilePostsLoading
  );

  useEffect(() => {
    if (posts.length > 0) {
      setList(
        posts.map((e) => {
          return (
            <PostCard
              key={e.id}
              e={e}
              place={"anotherProfilePosts"}
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
      </>
    );
  }, [list, posts.length, profilePostsLoading, theme.palette]);

  return element;
};

export default AnotherProfilePosts;
