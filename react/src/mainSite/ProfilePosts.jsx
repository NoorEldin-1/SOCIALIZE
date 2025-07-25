import { Box, ButtonBase, Typography, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showDialog } from "../features/dialogSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import Button from "@mui/material/Button";

const ProfilePosts = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setList(
      Array.from({ length: 20 }).map((_, i) => {
        return (
          <Card sx={{ width: 300 }} key={i}>
            <CardMedia
              sx={{ height: 140, cursor: "pointer" }}
              image="https://i.pinimg.com/736x/31/c4/27/31c427e803501f8ec681153b85e789d5.jpg"
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

  return <>{list}</>;
};

export default ProfilePosts;
