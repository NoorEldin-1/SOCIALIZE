import {
  AppBar,
  Box,
  TextField,
  Dialog,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { Toolbar, Typography } from "@mui/material";
import { IconButton, Button } from "@mui/material";
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { showDialog } from "../features/dialogSlice";
import { Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { createPost, reset } from "../features/postSlice";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddPost = () => {
  const theme = useTheme();
  const dialog = useSelector((state) => state.dialog);
  const dispatch = useDispatch();
  const fileRef = useRef();
  const [post, setPost] = useState({
    content: "",
    image: "",
  });
  const [contentValid, setContentValid] = useState("primary");
  const addPostLoading = useSelector((state) => state.post.addPostLoading);

  useEffect(() => {
    if (addPostLoading === "false") {
      dispatch(reset());
      dispatch(showDialog("no dialog"));
      setPost({
        content: "",
        image: "",
      });
      setContentValid("primary");
    }
  }, [addPostLoading, dispatch]);

  const handleContentChange = useCallback(
    (e) => {
      setPost({ ...post, content: e.target.value });
      if (e.target.value.length < 5) setContentValid("error");
      else setContentValid("success");
    },
    [post]
  );

  const handlePost = useCallback(() => {
    if (post.content.length < 5) return;
    if (post.image && !post.image.type.startsWith("image/")) return;
    dispatch(createPost(post));
  }, [dispatch, post]);

  const bar = useMemo(() => {
    return (
      <AppBar sx={{ position: "sticky", top: 0, left: 0, right: 0 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => dispatch(showDialog("no dialog"))}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            add post
          </Typography>
          {addPostLoading === "true" ? (
            <CircularProgress
              size={20}
              color={theme.palette.getContrastText(
                theme.palette.background.default
              )}
            />
          ) : (
            <Button autoFocus color="inherit" onClick={handlePost}>
              post
            </Button>
          )}
        </Toolbar>
      </AppBar>
    );
  }, [addPostLoading, dispatch, handlePost, theme.palette]);

  const content = useMemo(() => {
    return (
      <TextField
        fullWidth
        multiline
        minRows={6}
        label="post description"
        color={contentValid}
        value={post.content}
        onChange={handleContentChange}
      />
    );
  }, [contentValid, handleContentChange, post.content]);

  const image = useMemo(() => {
    return (
      <>
        <input
          type="file"
          accept="image/*"
          hidden
          ref={fileRef}
          onChange={(e) => setPost({ ...post, image: e.target.files[0] })}
        />
        {post.image && post.image.type.startsWith("image/") && (
          <Box
            sx={{
              width: "fit-content",
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexDirection: "column",
            }}
          >
            <img
              src={URL.createObjectURL(post.image)}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <IconButton
              size="large"
              color="primary"
              onClick={() => setPost({ ...post, image: "" })}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        <Button
          sx={{
            width: "fit-content",
            ":hover": { bgcolor: theme.palette.primary.main },
          }}
          variant="contained"
          endIcon={<FileUploadIcon />}
          onClick={() => fileRef.current.click()}
        >
          upload image
        </Button>
      </>
    );
  }, [post, theme.palette.primary.main]);

  const element = useMemo(() => {
    return (
      <Dialog
        open={dialog === "addPost"}
        fullScreen
        slots={{
          transition: Transition,
        }}
      >
        {bar}
        <Box sx={{ p: 2, display: "flex", gap: 1, flexDirection: "column" }}>
          {content}
          {image}
        </Box>
      </Dialog>
    );
  }, [bar, content, dialog, image]);

  return element;
};

export default AddPost;
