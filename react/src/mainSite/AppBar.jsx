import {
  Avatar,
  Box,
  ButtonBase,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useMemo, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { showDialog } from "../features/dialogSlice";
import { useNavigate } from "react-router";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const AppBar = ({ setValue }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
            navigate("/profile");
            handleClose();
            setValue(null);
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography flexGrow={1}>profile</Typography>
          <AccountCircleIcon />
        </MenuItem>
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
          <Typography flexGrow={1}>add post</Typography>
          <PostAddIcon />
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography flexGrow={1}>account settings</Typography>
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
          <Typography flexGrow={1}>delete account</Typography>
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
          <Typography flexGrow={1}>logout</Typography>
          <LogoutIcon />
        </MenuItem>
      </Menu>
    );
  }, [anchorEl, dispatch, navigate, open, setValue]);

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
          backgroundColor: window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "#3c3c3c"
            : "#edf2fa",
        }}
      >
        <img
          src="../../public/logo.png"
          alt="logo"
          style={{
            width: "150px",
          }}
        />
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
            src="../../public/guest.png"
            sx={{
              cursor: "pointer",
              width: "40px",
              height: "40px",
              border: `2px solid ${theme.palette.primary.main}`,
            }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          />
        </ButtonBase>
        {MainMenu}
      </Box>
    );
  }, [MainMenu, theme.palette.primary.main]);

  return element;
};
export default AppBar;
