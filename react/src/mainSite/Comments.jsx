import {
  Avatar,
  Box,
  ButtonBase,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router";
import { showDialog } from "../features/dialogSlice";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../features/postSlice";
import { translate } from "../main";

const Comments = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postInfo = useSelector((state) => state.post.postInfo);
  const [comment, setComment] = useState("");
  const addCommentLoading = useSelector(
    (state) => state.post.addCommentLoading
  );
  const allComments = useSelector((state) => state.post.postComments);
  const postCommentsLoading = useSelector(
    (state) => state.post.postCommentsLoading
  );
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (allComments.length > 0 && postCommentsLoading === "false") {
      setComments(
        allComments.map((e) => {
          return (
            <Box
              key={e.id}
              sx={{
                bgcolor: theme.palette.primary.dark,
                p: 2,
                borderRadius: 5,
                minWidth: 200,
                maxWidth: 500,
                boxShadow: 5,
                border: `2px solid ${theme.palette.primary.main}`,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ButtonBase
                  onClick={() => {
                    navigate(`/profile/${e.user.username}`);
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
                    alt="guest"
                    src={
                      e.user.profileImage
                        ? e.user.profileImage
                        : "../../public/guest.png"
                    }
                    sx={{
                      width: "25px",
                      height: "25px",
                      border: `1px solid ${theme.palette.primary.main}`,
                    }}
                  />
                </ButtonBase>
                <Typography variant="body2" color="primary" fontWeight={"bold"}>
                  {e.user.username}
                </Typography>
              </Box>
              <Box sx={{ pl: 4 }}>
                <Typography
                  sx={{
                    wordBreak: "break-word",
                    color: theme.palette.primary.light,
                  }}
                >
                  {e.comment}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Typography
                  variant="caption"
                  fontWeight={"bold"}
                  flexGrow={1}
                  align="right"
                  fontStyle={"italic"}
                  color="primary"
                >
                  {e.created_at}
                </Typography>
              </Box>
            </Box>
          );
        })
      );
    }
  }, [
    dispatch,
    navigate,
    allComments,
    theme.palette.background.default,
    theme.palette.primary.main,
    postCommentsLoading,
    theme.palette.primary.dark,
    theme.palette.primary.light,
  ]);

  const handleSendComment = () => {
    if (comment.trim().length > 0) {
      const info = {
        post_id: postInfo.id,
        comment: comment,
      };
      dispatch(addComment(info));
      setComment("");
    }
  };

  if (postCommentsLoading === "true") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <CircularProgress size={20} />
      </Box>
    );
  } else {
    return (
      <Box sx={{ p: 2, position: "relative", width: "100%" }}>
        <Box
          sx={{ mb: 2, mt: 1, display: "flex", gap: 1, alignItems: "center" }}
        >
          <TextField
            value={comment}
            sx={{
              "& .MuiInputBase-input": {
                color: theme.palette.primary.light,
              },
            }}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            multiline
            maxRows={3}
            size="medium"
            variant="outlined"
            label={translate("Add a comment")}
            slotProps={{
              input: {
                startAdornment: (
                  <ModeCommentIcon sx={{ mr: 2 }} color="primary" />
                ),
              },
            }}
          />
          {addCommentLoading === "true" ? (
            <CircularProgress size={20} />
          ) : (
            <IconButton
              size="large"
              color="primary"
              onClick={handleSendComment}
            >
              <SendIcon />
            </IconButton>
          )}
        </Box>
        {comments.length === 0 ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <Typography
              variant="h6"
              textTransform={"uppercase"}
              fontWeight={"bold"}
              color={theme.palette.primary.light}
            >
              {translate("No comments yet")}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {comments}
          </Box>
        )}
      </Box>
    );
  }
};

export default Comments;
