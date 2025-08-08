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
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showDialog } from "../features/dialogSlice";
import { deleteAccount } from "../features/authSlice";
import { translate } from "../main";

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const dialog = useSelector((state) => state.dialog);
  const loading = useSelector((state) => state.auth.deleteLoading);
  const theme = useTheme();

  const handleDelete = useCallback(() => {
    dispatch(deleteAccount());
  }, [dispatch]);

  const element = useMemo(() => {
    return (
      <Dialog
        open={dialog === "delete account"}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        <DialogTitle
          align="center"
          textTransform={"uppercase"}
          sx={{ color: theme.palette.primary.light }}
        >
          {translate("delete account")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            textTransform={"capitalize"}
            align="center"
            sx={{ color: theme.palette.primary.light }}
          >
            {translate(
              "are you sure you want to delete your account? if yes click delete, if no click cancel."
            )}
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

export default DeleteAccount;
