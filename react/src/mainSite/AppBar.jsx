import {
  Avatar,
  Box,
  ButtonBase,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { showDialog } from "../features/dialogSlice";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { translate } from "../main";

const AppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = useCallback(() => setAnchorEl(null), []);
  const dispatch = useDispatch();
  const theme = useTheme();

  const MainMenu = useMemo(() => {
    return (
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            sx: {
              minWidth: "225px",
              textTransform: "capitalize",
              background: theme.palette.primary.dark,
              color: theme.palette.primary.light,
            },
          },
        }}
        sx={{ mt: 1 }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch(showDialog("addPost"));
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography flexGrow={1}>{translate("add post")}</Typography>
          <PostAddIcon />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch(showDialog("accountSettings"));
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography flexGrow={1}>{translate("account settings")}</Typography>
          <ManageAccountsIcon />
        </MenuItem>
        <MenuItem
          onClick={() => dispatch(showDialog("delete account"))}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography flexGrow={1}>{translate("delete account")}</Typography>
          <DeleteIcon />
        </MenuItem>
        <MenuItem
          onClick={() => dispatch(showDialog("logout"))}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography flexGrow={1}>{translate("logout")}</Typography>
          <LogoutIcon />
        </MenuItem>
      </Menu>
    );
  }, [
    anchorEl,
    dispatch,
    handleClose,
    open,
    theme.palette.primary.dark,
    theme.palette.primary.light,
  ]);

  const element = useMemo(() => {
    return (
      <Box
        sx={{
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10000,
          background: theme.palette.primary.dark,
        }}
      >
        <Typography
          align="center"
          variant="h6"
          textTransform={"uppercase"}
          color={theme.palette.primary.main}
          fontWeight={"bold"}
          letterSpacing={"2px"}
        >
          socialize.
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ButtonBase
            component="label"
            role={undefined}
            tabIndex={-1}
            sx={{
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
                window.localStorage.getItem("profileImage")
                  ? window.localStorage.getItem("profileImage")
                  : "../../public/guest.png"
              }
              sx={{
                cursor: "pointer",
                width: "40px",
                height: "40px",
                border: `2px solid ${theme.palette.primary.main}`,
              }}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            />
          </ButtonBase>
        </Box>
        {MainMenu}
      </Box>
    );
  }, [MainMenu, theme.palette.primary.dark, theme.palette.primary.main]);

  return element;
};
export default AppBar;
