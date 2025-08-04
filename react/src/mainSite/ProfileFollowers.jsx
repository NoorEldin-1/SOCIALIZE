import {
  Box,
  ButtonBase,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getFollowers } from "../features/followSlice";

const ProfileFollowers = () => {
  const theme = useTheme();
  const [tabList, setTabList] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const followers = useSelector((state) => state.follow.followers);
  const loading = useSelector((state) => state.follow.followersLoading);

  useEffect(() => {
    dispatch(getFollowers(window.localStorage.getItem("userId")));
  }, [dispatch]);

  useEffect(() => {
    if (followers.length > 0) {
      setTabList(
        followers.map((e, i) => {
          return (
            <Tab
              key={i}
              disableRipple
              label={
                <Box
                  onClick={() => navigate(`/profile/${e.username}`)}
                  sx={{
                    bgcolor: theme.palette.getContrastText(
                      theme.palette.primary.main
                    ),
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    overflow: "hidden",
                    borderRadius: 4,
                    boxShadow: 10,
                    width: "200px",
                  }}
                >
                  <img
                    src={e.coverImage ? e.coverImage : "../../public/cover.jpg"}
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      height: "175px",
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
                      mx: "auto",
                      mt: "-30px",
                    }}
                  >
                    <Avatar
                      src={
                        e.profileImage
                          ? e.profileImage
                          : "../../public/guest.png"
                      }
                      sx={{
                        cursor: "pointer",
                        width: "50px",
                        height: "50px",
                        border: `2px solid ${theme.palette.primary.main}`,
                      }}
                    />
                  </ButtonBase>
                  <Typography
                    variant="body1"
                    color="primary"
                    textTransform={"none"}
                  >
                    {e.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="primary"
                    textTransform={"none"}
                    fontWeight={"bold"}
                  >
                    @{e.username}
                  </Typography>
                </Box>
              }
            />
          );
        })
      );
    }
  }, [followers, navigate, theme.palette]);

  if (loading === "true") {
    return <CircularProgress />;
  } else {
    return (
      <Box
        sx={{
          maxWidth: "900px",
          backgroundColor: theme.palette.background.paper,
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: 10,
          mb: 3,
          mx: "auto",
        }}
      >
        {followers.length > 0 ? (
          <Tabs
            value={0}
            textColor="primary"
            indicatorColor="transparent"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            slotProps={{
              scrollButtons: { sx: { color: theme.palette.primary.main } },
            }}
          >
            {tabList}
          </Tabs>
        ) : (
          <Typography
            variant="h6"
            color="primary"
            textAlign={"center"}
            p={2}
            alignContent={"center"}
          >
            No followers
          </Typography>
        )}
      </Box>
    );
  }
};

export default ProfileFollowers;
