import {
  AppBar,
  Box,
  TextField,
  Dialog,
  Switch,
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
import { editAccount } from "../features/authSlice";
import { useNavigate } from "react-router";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AccountSettings = () => {
  const theme = useTheme();
  const dialog = useSelector((state) => state.dialog);
  const dispatch = useDispatch();
  const editLoading = useSelector((state) => state.auth.editLoading);
  const profileImageRef = useRef();
  const coverImageRef = useRef();
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    name: "",
    profileImage: "",
    coverImage: "",
    showLikes: window.localStorage.getItem("showLikes"),
    showShares: window.localStorage.getItem("showShares"),
    showFollowers: window.localStorage.getItem("showFollowers"),
    showFollowing: window.localStorage.getItem("showFollowing"),
  });
  const [nameValid, setNameValid] = useState("primary");
  const [profileImageValid, setProfileImageValid] = useState("");
  const [coverImageValid, setCoverImageValid] = useState("");

  useEffect(() => {
    if (editLoading === false) {
      dispatch(showDialog("no dialog"));
      navigate("/profile");
    }
  }, [dispatch, editLoading, navigate]);

  useEffect(() => {
    setInfo((prev) => ({
      ...prev,
      name: window.localStorage.getItem("name"),
    }));
  }, []);

  const handleNameChange = useCallback((e) => {
    setInfo((prev) => ({ ...prev, name: e.target.value }));
    if (e.target.value.length >= 3) setNameValid("success");
    else setNameValid("error");
  }, []);

  const handleProfileImageChange = useCallback((e) => {
    if (e.target.files[0] && e.target.files[0].type.startsWith("image/")) {
      setInfo((prev) => ({ ...prev, profileImage: e.target.files[0] }));
      setProfileImageValid(true);
    } else setProfileImageValid(false);
  }, []);

  const handleCoverImageChange = useCallback((e) => {
    if (e.target.files[0] && e.target.files[0].type.startsWith("image/")) {
      setInfo((prev) => ({ ...prev, coverImage: e.target.files[0] }));
      setCoverImageValid(true);
    } else setCoverImageValid(false);
  }, []);

  const handleChange = useCallback(() => {
    if (info.profileImage && profileImageValid === false) return;
    if (info.coverImage && coverImageValid === false) return;
    if (info.name.length < 3) return;
    if (
      info.name === window.localStorage.getItem("name") &&
      info.showLikes === window.localStorage.getItem("showLikes") &&
      info.showShares === window.localStorage.getItem("showShares") &&
      info.showFollowers === window.localStorage.getItem("showFollowers") &&
      info.showFollowing === window.localStorage.getItem("showFollowing") &&
      !info.profileImage &&
      !info.coverImage
    )
      return;
    dispatch(editAccount(info));
  }, [coverImageValid, dispatch, info, profileImageValid]);

  const bar = useMemo(() => {
    return (
      <AppBar
        sx={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
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
            settings
          </Typography>
          {editLoading ? (
            <CircularProgress
              size={20}
              color={theme.palette.getContrastText(
                theme.palette.background.default
              )}
            />
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                handleChange();
              }}
            >
              change
            </Button>
          )}
        </Toolbar>
      </AppBar>
    );
  }, [dispatch, editLoading, handleChange, theme.palette]);

  const textField = useMemo(() => {
    return (
      <TextField
        fullWidth
        label="full name"
        color={nameValid}
        value={info.name}
        onChange={handleNameChange}
      />
    );
  }, [handleNameChange, info.name, nameValid]);

  const imagesInput = useMemo(() => {
    return (
      <>
        <input
          type="file"
          accept="image/*"
          hidden
          ref={profileImageRef}
          onChange={handleProfileImageChange}
        />
        <input
          type="file"
          accept="image/*"
          hidden
          ref={coverImageRef}
          onChange={handleCoverImageChange}
        />
      </>
    );
  }, [handleCoverImageChange, handleProfileImageChange]);

  const showImages = useMemo(() => {
    return (
      <Box sx={{ display: "flex", gap: 2 }}>
        {info.profileImage && profileImageValid === true && (
          <img
            src={URL.createObjectURL(info.profileImage)}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        )}
        {info.coverImage && coverImageValid === true && (
          <img
            src={URL.createObjectURL(info.coverImage)}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        )}
      </Box>
    );
  }, [coverImageValid, info.coverImage, info.profileImage, profileImageValid]);

  const handleUpload = useMemo(() => {
    return (
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: "column",
          maxWidth: "300px",
        }}
      >
        <Button
          fullWidth
          variant="contained"
          endIcon={<FileUploadIcon />}
          onClick={() => profileImageRef.current.click()}
        >
          change profile image
        </Button>
        <Button
          fullWidth
          variant="contained"
          endIcon={<FileUploadIcon />}
          onClick={() => coverImageRef.current.click()}
        >
          change cover image
        </Button>
      </Box>
    );
  }, []);

  const switches = useMemo(() => {
    const label = { inputProps: { "aria-label": "Switch demo" } };
    return (
      <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Switch
            size="small"
            {...label}
            checked={info.showLikes === "true"}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, showLikes: `${e.target.checked}` }))
            }
          />
          <Typography
            variant="body2"
            sx={{
              cursor: "pointer",
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
            onClick={() =>
              setInfo((prev) => ({
                ...prev,
                showLikes: `${prev.showLikes === "true" ? "false" : "true"}`,
              }))
            }
          >
            show likes
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Switch
            size="small"
            {...label}
            checked={info.showShares === "true"}
            onChange={(e) =>
              setInfo((prev) => ({
                ...prev,
                showShares: `${e.target.checked}`,
              }))
            }
          />
          <Typography
            variant="body2"
            sx={{
              cursor: "pointer",
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
            onClick={() =>
              setInfo((prev) => ({
                ...prev,
                showShares: `${prev.showShares === "true" ? "false" : "true"}`,
              }))
            }
          >
            show shares
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Switch
            size="small"
            {...label}
            checked={info.showFollowers === "true"}
            onChange={(e) =>
              setInfo((prev) => ({
                ...prev,
                showFollowers: `${e.target.checked}`,
              }))
            }
          />
          <Typography
            variant="body2"
            sx={{
              cursor: "pointer",
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
            onClick={() =>
              setInfo((prev) => ({
                ...prev,
                showFollowers: `${
                  prev.showFollowers === "true" ? "false" : "true"
                }`,
              }))
            }
          >
            show followers
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Switch
            size="small"
            {...label}
            checked={info.showFollowing === "true"}
            onChange={(e) =>
              setInfo((prev) => ({
                ...prev,
                showFollowing: `${e.target.checked}`,
              }))
            }
          />
          <Typography
            variant="body2"
            sx={{
              cursor: "pointer",
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
            onClick={() =>
              setInfo((prev) => ({
                ...prev,
                showFollowing: `${
                  prev.showFollowing === "true" ? "false" : "true"
                }`,
              }))
            }
          >
            show following
          </Typography>
        </Box>
      </Box>
    );
  }, [info.showFollowers, info.showFollowing, info.showLikes, info.showShares]);

  const element = useMemo(() => {
    return (
      <Dialog
        fullScreen
        open={dialog === "accountSettings"}
        slots={{
          transition: Transition,
        }}
      >
        {bar}
        <Box sx={{ p: 2, display: "flex", gap: 2, flexDirection: "column" }}>
          {textField}
          {imagesInput}
          {showImages}
          {handleUpload}
          {switches}
        </Box>
      </Dialog>
    );
  }, [bar, dialog, handleUpload, imagesInput, showImages, switches, textField]);

  return element;
};

export default AccountSettings;
