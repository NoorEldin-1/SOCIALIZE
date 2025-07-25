import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { showDialog } from "../features/dialogSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { showSecondDialog } from "../features/secondDialogSlice";

const Share = () => {
  const dispatch = useDispatch();
  const dialog = useSelector((state) => state.dialog);
  const secondDialog = useSelector((state) => state.secondDialog);

  const element = useMemo(() => {
    return (
      <Dialog open={dialog === "share" || secondDialog === "share"}>
        <DialogTitle align="center" textTransform={"uppercase"}>
          share post
        </DialogTitle>
        <DialogContent>
          <DialogContentText textTransform={"capitalize"} align="center">
            share the post with your friends, if you want to share it on your
            profile click share.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              if (secondDialog === "share") {
                dispatch(showSecondDialog("no dialog"));
              } else {
                dispatch(showDialog("no dialog"));
              }
            }}
          >
            cancel
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={() => {
              if (secondDialog === "share") {
                dispatch(showSecondDialog("no dialog"));
              } else {
                dispatch(showDialog("no dialog"));
              }
            }}
          >
            share
          </Button>
        </DialogActions>
      </Dialog>
    );
  }, [dialog, dispatch, secondDialog]);

  return element;
};

export default Share;
