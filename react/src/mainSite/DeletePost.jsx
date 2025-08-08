import { useDispatch, useSelector } from "react-redux";
import { showDialog } from "../features/dialogSlice";
import { useCallback, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { deletePost, reset } from "../features/postSlice";
import { translate } from "../main";

const DeletePost = () => {
  const dispatch = useDispatch();
  const dialog = useSelector((state) => state.dialog);
  const loading = useSelector((state) => state.post.deletePostLoading);
  const postInfo = useSelector((state) => state.post.postInfo);
  const theme = useTheme();
  useEffect(() => {
    if (loading === "false") {
      dispatch(showDialog("no dialog"));
      dispatch(reset());
    }
  }, [dispatch, loading]);

  const handleDelete = useCallback(() => {
    dispatch(deletePost(postInfo));
  }, [dispatch, postInfo]);

  const element = useMemo(() => {
    return (
      <Dialog
        open={dialog === "delete post"}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        <DialogTitle
          align="center"
          textTransform={"uppercase"}
          color={theme.palette.primary.light}
        >
          {translate("delete post")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            textTransform={"capitalize"}
            align="center"
            color={theme.palette.primary.light}
          >
            {translate(
              "are you sure you want to delete this post forever? if yes click delete, if no click cancel."
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {loading === "true" ? (
            <CircularProgress size={20} />
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={() => dispatch(showDialog("no dialog"))}
              >
                {translate("cancel")}
              </Button>
              <Button variant="outlined" color="error" onClick={handleDelete}>
                {translate("delete")}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    );
  }, [
    dialog,
    dispatch,
    handleDelete,
    loading,
    theme.palette.primary.dark,
    theme.palette.primary.light,
  ]);

  return element;
};

export default DeletePost;
