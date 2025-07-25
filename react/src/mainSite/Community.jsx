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
  useTheme,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { showDialog } from "../features/dialogSlice";

const Community = () => {
  const theme = useTheme();
  const [list, setList] = useState([]);
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
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
                  src="../../public/logo.png"
                  sx={{
                    width: "30px",
                    height: "30px",
                    border: `1px solid ${theme.palette.primary.main}`,
                  }}
                />
              </ButtonBase>
              <Typography variant="caption" fontWeight={"bold"} color="primary">
                @SOCIALIZE
              </Typography>
            </Box>
            <CardMedia
              sx={{ height: 140, cursor: "pointer" }}
              image="https://i.pinimg.com/736x/9c/b2/f8/9cb2f84db5192e058c0da2d9620b2c85.jpg"
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
      </Box>
    );
  }, [list]);

  return element;
};

export default Community;
