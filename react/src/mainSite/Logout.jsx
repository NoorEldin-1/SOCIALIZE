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
import { logout } from "../features/authSlice";
import { translate } from "../main";

const Logout = () => {
  const dispatch = useDispatch();
  const dialog = useSelector((state) => state.dialog);
  const loading = useSelector((state) => state.auth.logoutLoading);
  const theme = useTheme();

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const element = useMemo(() => {
    return (
      <Dialog
        open={dialog === "logout"}
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
          {translate("logout")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            textTransform={"capitalize"}
            align="center"
            sx={{ color: theme.palette.primary.light }}
          >
            {translate(
              "are you sure you want to logout? if yes click logout, if no click cancel."
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
              <Button variant="outlined" color="error" onClick={handleLogout}>
                {translate("logout")}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    );
  }, [
    dialog,
    dispatch,
    handleLogout,
    loading,
    theme.palette.primary.dark,
    theme.palette.primary.light,
  ]);

  return element;
};

export default Logout;
