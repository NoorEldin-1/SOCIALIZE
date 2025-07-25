import { AppBar, Box, TextField, Dialog } from "@mui/material";
import { Toolbar, Typography } from "@mui/material";
import { IconButton, Button } from "@mui/material";
import { forwardRef, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showDialog } from "../features/dialogSlice";
import { Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddPost = () => {
  const dialog = useSelector((state) => state.dialog);
  const dispatch = useDispatch();
  const fileRef = useRef();
  return (
    <Dialog
      fullScreen
      open={dialog === "addPost"}
      slots={{
        transition: Transition,
      }}
    >
      <AppBar sx={{ position: "sticky", top: 0, left: 0, right: 0 }}>
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
            add post
          </Typography>
          <Button
            autoFocus
            color="inherit"
            onClick={() => dispatch(showDialog("no dialog"))}
          >
            post
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2, display: "flex", gap: 1, flexDirection: "column" }}>
        <TextField
          fullWidth
          multiline
          minRows={6}
          label="post description"
          color="primary"
        />
        <input
          type="file"
          accept="image/*"
          hidden
          ref={fileRef}
          onChange={(e) => console.log(e.target.files)}
        />
        <Button
          sx={{ width: "fit-content" }}
          variant="contained"
          endIcon={<FileUploadIcon />}
          onClick={() => fileRef.current.click()}
        >
          upload image
        </Button>
      </Box>
    </Dialog>
  );
};

export default AddPost;
