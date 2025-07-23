import {
  Avatar,
  Box,
  ButtonBase,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { showDialog } from "../features/dialogSlice";

const AppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);
  const dispatch = useDispatch();

  const MainMenu = useMemo(() => {
    return (
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            sx: {
              minWidth: "200px",
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
          onClick={handleClose}
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
          onClick={handleClose}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography flexGrow={1}>edit account</Typography>
          <EditIcon />
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
  }, [anchorEl, dispatch, open]);

  const element = useMemo(() => {
    return (
      <Box
        sx={{
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
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
            sx={{ cursor: "pointer", width: "40px", height: "40px" }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          />
        </ButtonBase>
        {MainMenu}
      </Box>
    );
  }, [MainMenu]);

  return element;
};
export default AppBar;
