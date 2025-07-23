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
import { logout } from "../features/authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const dialog = useSelector((state) => state.dialog);
  const loading = useSelector((state) => state.auth.logoutLoading);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const element = useMemo(() => {
    return (
      <Dialog open={dialog === "logout"}>
        <DialogTitle align="center" textTransform={"uppercase"}>
          logout
        </DialogTitle>
        <DialogContent>
          <DialogContentText textTransform={"capitalize"} align="center">
            are you sure you want to logout? if yes click logout, if no click
            cancel.
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
              <Button variant="outlined" color="error" onClick={handleLogout}>
                logout
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    );
  }, [dialog, dispatch, handleLogout, loading]);

  return element;
};

export default Logout;
