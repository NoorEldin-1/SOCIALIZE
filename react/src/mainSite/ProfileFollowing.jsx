import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ButtonBase from "@mui/material/ButtonBase";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { getFollowing } from "../features/followSlice";
import { translate } from "../main";

const ProfileFollowing = () => {
  const theme = useTheme();
  const [tabList, setTabList] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const following = useSelector((state) => state.follow.following);
  const loading = useSelector((state) => state.follow.followingLoading);
  const { username } = useParams();

  useEffect(() => {
    if (username) {
      dispatch(getFollowing(username));
    } else {
      dispatch(getFollowing(window.localStorage.getItem("username")));
    }
  }, [dispatch, username]);

  useEffect(() => {
    if (following.length > 0) {
      setTabList(
        following.map((e, i) => {
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
                    {e.username}
                  </Typography>
                </Box>
              }
            />
          );
        })
      );
    }
  }, [following, navigate, theme.palette]);

  if (loading === "true") {
    return <CircularProgress />;
  } else {
    return (
      <Box
        sx={{
          maxWidth: "900px",
          backgroundColor: theme.palette.primary.dark,
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: 10,
          mb: 3,
          mx: "auto",
        }}
      >
        {following.length > 0 ? (
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
            color={theme.palette.primary.dark}
            py={1}
            px={5}
            bgcolor={theme.palette.primary.light}
            borderRadius={50}
            textTransform={"uppercase"}
          >
            {translate("no following")}
          </Typography>
        )}
      </Box>
    );
  }
};

export default ProfileFollowing;
