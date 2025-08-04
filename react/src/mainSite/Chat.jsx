import {
  AppBar,
  Avatar,
  Box,
  ButtonBase,
  Dialog,
  IconButton,
  TextField,
  Toolbar,
  Slide,
  useTheme,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { showDialog } from "../features/dialogSlice";
import { useDispatch, useSelector } from "react-redux";
import { forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CloseIcon from "@mui/icons-material/Close";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Chat = () => {
  const dialog = useSelector((state) => state.dialog);
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const [chat, setChat] = useState([]);

  useEffect(() => {
    setChat(
      Array.from({ length: 10 }).map((_, i) => {
        return (
          <Typography
            variant="body1"
            key={i}
            sx={{
              wordBreak: "break-word",
              maxWidth: "70%",
              bgcolor: theme.palette.primary.main,
              borderRadius: 5,
              p: 1,
              ml: i % 2 === 1 ? "auto" : 0,
            }}
          >
            <Typography
              variant="caption"
              fontWeight={"bold"}
              display={"block"}
              textTransform={"capitalize"}
              color="#121212"
            >
              just now
            </Typography>
            chat again with any one aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa asdasd
            asdasd asdasd asdasd asdas dddddddddddddddddddddddddddddddddddddd
          </Typography>
        );
      })
    );
  }, [theme.palette.primary.main]);

  return (
    <Dialog
      fullScreen
      open={dialog === "chat"}
      slots={{
        transition: Transition,
      }}
    >
      <AppBar
        sx={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ButtonBase
              onClick={() => {
                navigate("/profile");
                dispatch(showDialog("no dialog"));
              }}
              component="label"
              role={undefined}
              tabIndex={-1}
              sx={{
                cursor: "pointer",
                borderRadius: "40px",
                "&:has(:focus-visible)": {
                  outline: "2px solid",
                  outlineOffset: "2px",
                },
              }}
            >
              <Avatar
                alt="guest"
                src="https://i.pinimg.com/736x/c9/0f/84/c90f844b8628abee777470f40d22c38f.jpg"
                sx={{
                  width: "30px",
                  height: "30px",
                  border: `1px solid ${theme.palette.primary.main}`,
                }}
              />
            </ButtonBase>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="caption" fontWeight={"bold"}>
                name
              </Typography>
              <Typography variant="caption">@username</Typography>
            </Box>
          </Box>
          <IconButton
            color="inherit"
            onClick={() => dispatch(showDialog("no dialog"))}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          p: 2,
          height: "100%",
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {chat}
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexDirection: "row",
            alignItems: "center",
            position: "fixed",
            bottom: 10,
            left: 75,
            right: 75,
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <TextField
            sx={{
              borderRadius: 10,
              "& .MuiOutlinedInput-root": { borderRadius: 10 },
              bgcolor: theme.palette.mode === "dark" ? "#3c3c3c" : "#f0f0f0",

              "& .MuiInputBase-input": {
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
              },
            }}
            fullWidth
            color="primary"
            multiline
            maxRows={2}
            placeholder="send a message..."
            slotProps={{
              input: {
                endAdornment: (
                  <SendIcon
                    sx={{
                      cursor: "pointer",
                      color: theme.palette.primary.main,
                    }}
                  />
                ),
              },
            }}
          />
        </Box>
      </Box>
    </Dialog>
  );
};

export default Chat;
