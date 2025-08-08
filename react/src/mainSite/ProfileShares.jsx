import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { nextSharesPosts, userShares } from "../features/postSlice";
import PostCard from "./PostCard";
import { useTheme } from "@mui/material";
import { translate } from "../main";

const ProfileShares = ({ place }) => {
  const theme = useTheme();
  const { username } = useParams();
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const userSharesPosts = useSelector((state) => state.post.userShares);
  const userSharesLoading = useSelector(
    (state) => state.post.userSharesLoading
  );
  const nextPage = useSelector((state) => state.post.nextSharesPosts);
  const paginateLoading = useSelector((state) => state.post.paginateLoading);

  const handlePaginate = useCallback(() => {
    if (nextPage && paginateLoading === "false") {
      if (
        Math.ceil(window.scrollY + document.documentElement.clientHeight) >=
        document.documentElement.scrollHeight
      ) {
        dispatch(nextSharesPosts(nextPage));
      }
    }
  }, [dispatch, nextPage, paginateLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handlePaginate);
    return () => window.removeEventListener("scroll", handlePaginate);
  }, [handlePaginate]);

  useEffect(() => {
    if (username) {
      dispatch(userShares(username));
    } else {
      dispatch(userShares(window.localStorage.getItem("username")));
    }
  }, [dispatch, username]);

  useEffect(() => {
    if (userSharesPosts.length > 0 && userSharesLoading === "false") {
      setList(
        userSharesPosts.map((e) => {
          return <PostCard key={e.id} e={e} place={place} />;
        })
      );
    }
  }, [place, userSharesLoading, userSharesPosts]);

  const element = useMemo(() => {
    if (userSharesLoading === "true") {
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      );
    } else {
      if (userSharesPosts.length > 0 && userSharesLoading === "false") {
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
            {translate("no shares yet")}
          </Typography>
        );
      }
    }
  }, [
    list,
    theme.palette.primary.dark,
    theme.palette.primary.light,
    userSharesLoading,
    userSharesPosts.length,
  ]);

  return element;
};

export default ProfileShares;
