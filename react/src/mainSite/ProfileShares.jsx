import { Box, Typography, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { showDialog } from "../features/dialogSlice";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import ButtonBase from "@mui/material/ButtonBase";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const ProfileShares = () => {
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
                  src="https://i.pinimg.com/736x/75/3e/8b/753e8b077aa9dd75cf101c340b995d59.jpg"
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
                  name
                </Typography>
                <Typography variant="caption">@username</Typography>
              </Box>
            </Box>
            <CardMedia
              sx={{ height: 140, cursor: "pointer" }}
              image="https://i.pinimg.com/736x/e9/b8/c6/e9b8c67bdf7b615706935cf29ff6a7db.jpg"
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
          <Typography flexGrow={1}>un follow</Typography>
          <PersonRemoveIcon />
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
      <>
        {list}
        {cardMenu}
      </>
    );
  }, [cardMenu, list]);

  return element;
};

export default ProfileShares;
