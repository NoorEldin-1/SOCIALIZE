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
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/authSlice";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loginLoading);
  const error = useSelector((state) => state.auth.loginError);

  const [info, setInfo] = useState({
    username: "",
    password: "",
  });
  const [validate, setValidate] = useState({
    username: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

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

  const handleLogin = useCallback(() => {
    if (validate.username !== "success" || validate.password !== "success")
      return;
    dispatch(login(info));
  }, [dispatch, info, validate.password, validate.username]);

  const userNameElement = useMemo(() => {
    return (
      <TextField
        slotProps={{ input: { endAdornment: <AccountCircleIcon /> } }}
        type="text"
        onChange={handleUsername}
        color={validate.username}
        value={info.username}
        label="username"
        required
        size="medium"
        helperText={
          <Typography variant="caption" sx={{ textTransform: "capitalize" }}>
            at least 3 character
          </Typography>
        }
      />
    );
  }, [handleUsername, info.username, validate.username]);

  const passwordElement = useMemo(() => {
    return (
      <TextField
        slotProps={{
          input: {
            endAdornment: visible ? (
              <VisibilityOffIcon
                sx={{ cursor: "pointer" }}
                onClick={() => setVisible((prev) => !prev)}
              />
            ) : (
              <VisibilityIcon
                sx={{ cursor: "pointer" }}
                onClick={() => setVisible((prev) => !prev)}
              />
            ),
          },
        }}
        type={visible ? "text" : "password"}
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
      />
    );
  }, [handlePassword, info.password, validate.password, visible]);

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
            bgcolor: theme.palette.background.default,
            borderRadius: "10px",
            width: { xs: "300px", sm: "400px" },
          }}
        >
          <Typography
            align="center"
            variant="h6"
            color={theme.palette.getContrastText(
              theme.palette.background.default
            )}
            textTransform={"uppercase"}
          >
            login
          </Typography>
          {error && (
            <Typography
              variant="caption"
              color="error"
              textTransform={"capitalize"}
              fontWeight={"bold"}
              align="center"
            >
              {error}
            </Typography>
          )}
          {userNameElement}
          {passwordElement}
          {loading ? (
            <CircularProgress size={20} sx={{ display: "block", mx: "auto" }} />
          ) : (
            <Button variant="contained" onClick={handleLogin}>
              login
            </Button>
          )}
          <Typography
            variant="caption"
            color={theme.palette.getContrastText(
              theme.palette.background.default
            )}
            sx={{
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
              textTransform: "capitalize",
            }}
            onClick={() => {
              navigate("/signup");
            }}
          >
            don't have an account?
          </Typography>
        </Box>
      </Box>
    );
  }, [
    error,
    handleLogin,
    loading,
    navigate,
    passwordElement,
    theme.palette,
    userNameElement,
  ]);

  return element;
};

export default Login;
