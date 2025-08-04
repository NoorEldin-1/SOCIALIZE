import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useDispatch, useSelector } from "react-redux";
import { reset, signup } from "../features/authSlice";

const Signup = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.signupLoading);
  const usernameError = useSelector((state) => state.auth.signupError);

  const [info, setInfo] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [validate, setValidate] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  const handleFullName = useCallback(
    (e) => {
      if (e.target.value.length < 3) {
        setValidate({ ...validate, fullName: "error" });
      } else {
        setValidate({ ...validate, fullName: "success" });
      }
      setInfo({ ...info, fullName: e.target.value });
    },
    [info, validate]
  );

  const handleUsername = useCallback(
    (e) => {
      if (e.target.value.length < 3) {
        setValidate({ ...validate, username: "error" });
      } else {
        setValidate({ ...validate, username: "success" });
      }
      setInfo({ ...info, username: e.target.value });
    },
    [info, validate]
  );

  const handlePassword = useCallback(
    (e) => {
      if (e.target.value.length < 8) {
        setValidate({ ...validate, password: "error" });
      } else {
        setValidate({ ...validate, password: "success" });
      }
      setInfo({ ...info, password: e.target.value });
    },
    [info, validate]
  );

  const handleConfirmPassword = useCallback(
    (e) => {
      if (e.target.value !== info.password) {
        setValidate({ ...validate, confirmPassword: "error" });
      } else {
        setValidate({ ...validate, confirmPassword: "success" });
      }
      setInfo({ ...info, confirmPassword: e.target.value });
    },
    [info, validate]
  );

  const handleSignup = useCallback(() => {
    if (
      validate.username !== "success" ||
      validate.password !== "success" ||
      validate.confirmPassword !== "success" ||
      validate.fullName !== "success"
    )
      return;
    dispatch(signup(info));
  }, [
    dispatch,
    info,
    validate.confirmPassword,
    validate.fullName,
    validate.password,
    validate.username,
  ]);

  const fullNameElement = useMemo(() => {
    return (
      <TextField
        autoComplete="off"
        fullWidth
        slotProps={{ input: { endAdornment: <PersonOutlineIcon /> } }}
        onChange={handleFullName}
        color={validate.fullName}
        value={info.fullName}
        label="full name"
        required
        size="medium"
        helperText={
          <Typography variant="caption" sx={{ textTransform: "capitalize" }}>
            at least 3 character
          </Typography>
        }
      />
    );
  }, [handleFullName, validate.fullName, info.fullName]);

  const userNameElement = useMemo(() => {
    return (
      <TextField
        autoComplete="off"
        fullWidth
        slotProps={{ input: { endAdornment: <AccountCircleIcon /> } }}
        onChange={handleUsername}
        color={validate.username}
        value={info.username}
        label="username"
        required
        size="medium"
        helperText={
          usernameError ? (
            <Typography
              color="error"
              variant="caption"
              sx={{ textTransform: "capitalize" }}
            >
              {usernameError}
            </Typography>
          ) : (
            <Typography variant="caption" sx={{ textTransform: "capitalize" }}>
              at least 3 character
            </Typography>
          )
        }
      />
    );
  }, [handleUsername, info.username, usernameError, validate.username]);

  const passwordElement = useMemo(() => {
    return (
      <TextField
        autoComplete="off"
        fullWidth
        type={visiblePassword ? "text" : "password"}
        onChange={handlePassword}
        color={validate.password}
        value={info.password}
        label="password"
        required
        size="medium"
        helperText={
          <Typography variant="caption" sx={{ textTransform: "capitalize" }}>
            at least 8 character
          </Typography>
        }
        slotProps={{
          input: {
            endAdornment: visiblePassword ? (
              <VisibilityOffIcon
                sx={{ cursor: "pointer" }}
                onClick={() => setVisiblePassword((prev) => !prev)}
              />
            ) : (
              <VisibilityIcon
                sx={{ cursor: "pointer" }}
                onClick={() => setVisiblePassword((prev) => !prev)}
              />
            ),
          },
        }}
      />
    );
  }, [handlePassword, info.password, validate.password, visiblePassword]);

  const confirmPasswordElement = useMemo(() => {
    return (
      <TextField
        autoComplete="off"
        fullWidth
        type={visibleConfirmPassword ? "text" : "password"}
        onChange={handleConfirmPassword}
        color={validate.confirmPassword}
        value={info.confirmPassword}
        label="confirm password"
        required
        size="medium"
        helperText={
          <Typography variant="caption" sx={{ textTransform: "capitalize" }}>
            at least 8 character
          </Typography>
        }
        slotProps={{
          input: {
            endAdornment: visibleConfirmPassword ? (
              <VisibilityOffIcon
                sx={{ cursor: "pointer" }}
                onClick={() => setVisibleConfirmPassword((prev) => !prev)}
              />
            ) : (
              <VisibilityIcon
                sx={{ cursor: "pointer" }}
                onClick={() => setVisibleConfirmPassword((prev) => !prev)}
              />
            ),
          },
        }}
      />
    );
  }, [
    visibleConfirmPassword,
    handleConfirmPassword,
    validate.confirmPassword,
    info.confirmPassword,
  ]);

  const element = useMemo(() => {
    return (
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
          height: "100vh",
          width: "100%",
          zIndex: 100,
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            p: 2,
            bgcolor: theme.palette.secondary.light,
            borderRadius: "10px",
            width: { xs: "300px", sm: "600px" },
          }}
        >
          <Typography
            align="center"
            variant="h6"
            color={theme.palette.secondary.dark}
            textTransform={"uppercase"}
          >
            signup
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: "15px",
              alignItems: "center",
              width: "100%",
            }}
          >
            {fullNameElement}
            {userNameElement}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: "15px",
              alignItems: "center",
              width: "100%",
            }}
          >
            {passwordElement}
            {confirmPasswordElement}
          </Box>
          {loading ? (
            <CircularProgress size={20} sx={{ display: "block", mx: "auto" }} />
          ) : (
            <Button
              variant="contained"
              onClick={handleSignup}
              sx={{ ":hover": { bgcolor: theme.palette.primary.main } }}
            >
              signup
            </Button>
          )}
          <Typography
            variant="caption"
            color={theme.palette.secondary.dark}
            sx={{
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
              textTransform: "capitalize",
            }}
            onClick={() => {
              navigate("/login");
            }}
          >
            already have an account?
          </Typography>
        </Box>
      </Box>
    );
  }, [
    confirmPasswordElement,
    fullNameElement,
    handleSignup,
    loading,
    navigate,
    passwordElement,
    theme.palette,
    userNameElement,
  ]);

  return element;
};

export default Signup;
