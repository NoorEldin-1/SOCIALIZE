import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  ButtonBase,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { showDialog } from "../features/dialogSlice";
import { useNavigate } from "react-router";

const ForYou = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [list, setList] = useState([]);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setList(
      Array.from({ length: 20 }).map((_, i) => {
        return (
          <Card sx={{ width: 300 }} key={i}>
            <Box
              sx={{
                height: "50px",
                p: 1,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <ButtonBase
                onClick={(e) => setAnchorEl(e.currentTarget)}
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
                  src="https://i.pinimg.com/736x/c9/0f/84/c90f844b8628abee777470f40d22c38f.jpg"
                  sx={{
                    cursor: "pointer",
                    width: "30px",
                    height: "30px",
                    border: `1px solid ${theme.palette.primary.main}`,
                  }}
                />
              </ButtonBase>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="caption" fontWeight={"bold"}>
                  full name
                </Typography>
                <Typography variant="caption">@username</Typography>
              </Box>
            </Box>
            <CardMedia
              sx={{ height: 140, cursor: "pointer" }}
              image="https://i.pinimg.com/736x/b9/08/76/b90876a978042e928247088dab935d48.jpg"
              onClick={() => dispatch(showDialog("post"))}
            />
            <CardContent>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                size="small"
                startIcon={liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                onClick={() => setLiked(!liked)}
              >
                120
              </Button>
              <Button
                size="small"
                startIcon={<ShareIcon />}
                onClick={() => dispatch(showDialog("share"))}
              >
                10
              </Button>
              <Button
                size="small"
                startIcon={<ModeCommentIcon />}
                onClick={() => dispatch(showDialog("post"))}
              >
                10000
              </Button>
            </CardActions>
          </Card>
        );
      })
    );
  }, [dispatch, liked, theme.palette.primary.main]);

  const cardMenu = useMemo(() => {
    return (
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          list: {
            sx: {
              minWidth: "200px",
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
          onClick={() => setAnchorEl(null)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography flexGrow={1}>follow</Typography>
          <PersonAddIcon />
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            navigate("/profile");
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography flexGrow={1}>view account</Typography>
          <AccountCircleIcon />
        </MenuItem>
      </Menu>
    );
  }, [anchorEl, navigate, open]);

  const element = useMemo(() => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
          py: 10,
        }}
      >
        {list}
        {cardMenu}
      </Box>
    );
  }, [cardMenu, list]);

  return element;
};

export default ForYou;
