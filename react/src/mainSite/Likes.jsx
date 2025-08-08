import {
  Avatar,
  Box,
  ButtonBase,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { showDialog } from "../features/dialogSlice";
import { useEffect, useState } from "react";
import { reset } from "../features/authSlice";
import { translate } from "../main";

const Likes = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const likes = useSelector((state) => state.post.postLikes);
  const postLikesLoading = useSelector((state) => state.post.postLikesLoading);
  const [list, setList] = useState([]);

  useEffect(() => {
    dispatch(reset());
    setList([]);
  }, [dispatch]);

  useEffect(() => {
    if (likes.length > 0 && postLikesLoading === "false") {
      setList(
        likes.map((e) => {
          return (
            <Box
              key={e.id}
              sx={{
                bgcolor: theme.palette.primary.dark,
                p: 2,
                borderRadius: 50,
                maxWidth: "300px",
                display: "flex",
                flexDirection: "row",
                gap: 1,
                alignItems: "center",
                boxShadow: 5,
                border: `2px solid ${theme.palette.primary.main}`,
              }}
            >
              <ButtonBase
                onClick={() => {
                  navigate(`/profile/${e.username}`);
                  dispatch(showDialog("no dialog"));
                }}
                component="label"
                role={undefined}
                tabIndex={-1}
                sx={{
                  cursor: "pointer",
                  borderRadius: "40px",
                  "&:has(:focus-visible)": {
                    outline: "2px solid",
                    outlineOffset: "2px",
                  },
                }}
              >
                <Avatar
                  src={
                    e.profileImage ? e.profileImage : "../../public/guest.png"
                  }
                  sx={{
                    width: "25px",
                    height: "25px",
                    border: `1px solid ${theme.palette.primary.main}`,
                  }}
                />
              </ButtonBase>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="caption"
                  color={theme.palette.primary.light}
                >
                  {e.name}
                </Typography>
                <Typography
                  variant="caption"
                  color={theme.palette.primary.light}
                >
                  {e.username}
                </Typography>
              </Box>
            </Box>
          );
        })
      );
    }
  }, [
    dispatch,
    likes,
    navigate,
    postLikesLoading,
    theme.palette.background.default,
    theme.palette.primary.dark,
    theme.palette.primary.light,
    theme.palette.primary.main,
  ]);

  if (postLikesLoading === "true") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <CircularProgress size={20} sx={{ display: "block", mx: "auto" }} />
      </Box>
    );
  } else {
    if (list.length === 0) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <Typography
            variant="h6"
            textTransform={"uppercase"}
            fontWeight={"bold"}
            color={theme.palette.primary.light}
          >
            {translate("no likes yet")}
          </Typography>
        </Box>
      );
    } else {
      return (
        <Box
          sx={{
            p: 2,
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {list}
        </Box>
      );
    }
  }
};

export default Likes;
