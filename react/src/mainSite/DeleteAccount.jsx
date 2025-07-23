import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showDialog } from "../features/dialogSlice";
import { deleteAccount } from "../features/authSlice";

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const dialog = useSelector((state) => state.dialog);
  const loading = useSelector((state) => state.auth.deleteLoading);

  const handleDelete = useCallback(() => {
    dispatch(deleteAccount());
  }, [dispatch]);

  const element = useMemo(() => {
    return (
      <Dialog open={dialog === "delete account"}>
        <DialogTitle align="center" textTransform={"uppercase"}>
          delete account
        </DialogTitle>
        <DialogContent>
          <DialogContentText textTransform={"capitalize"} align="center">
            are you sure you want to delete your account? if yes click delete,
            if no click cancel.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <CircularProgress size={20} />
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={() => dispatch(showDialog("no dialog"))}
              >
                cancel
              </Button>
              <Button variant="outlined" color="error" onClick={handleDelete}>
                delete
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    );
  }, [dialog, dispatch, handleDelete, loading]);

  return element;
};

export default DeleteAccount;
