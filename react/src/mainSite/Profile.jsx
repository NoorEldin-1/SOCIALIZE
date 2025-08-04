import { Box, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import ProfilePosts from "./ProfilePosts";
import ProfileShares from "./ProfileShares";
import ProfileLikes from "./ProfileLikes";
import ProfileFollowing from "./ProfileFollowing";
import ProfileFollowers from "./ProfileFollowers";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { profilePosts } from "../features/postSlice";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = useState("posts");
  const dispatch = useDispatch();
  const handleChange = useCallback((_, newValue) => setValue(newValue), []);

  useEffect(() => {
    if (username) {
      if (username === window.localStorage.getItem("username")) {
        navigate("/");
      }
    }
  }, [navigate, username]);

  useEffect(() => {
    dispatch(profilePosts(window.localStorage.getItem("username")));
  }, [dispatch]);

  const top = useMemo(() => {
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <img
          src={
            window.localStorage.getItem("coverImage")
              ? window.localStorage.getItem("coverImage")
              : "../../public/cover.jpg"
          }
          alt="cover photo"
          style={{
            width: "100%",
            height: "250px",
            overflow: "hidden",
            borderRadius: 25,
            objectFit: "cover",
            border: `4px solid ${theme.palette.primary.main}`,
          }}
        />
        <img
          src={
            window.localStorage.getItem("profileImage")
              ? window.localStorage.getItem("profileImage")
              : "../../public/guest.png"
          }
          alt="profile photo"
          style={{
            display: "block",
            margin: "0 auto",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            marginTop: "-70px",
            backgroundColor: theme.palette.background.default,
            boxShadow: theme.shadows[20],
            objectFit: "cover",
            border: `2px solid ${theme.palette.primary.main}`,
          }}
        />
      </Box>
    );
  }, [
    theme.palette.background.default,
    theme.palette.primary.main,
    theme.shadows,
  ]);

  const info = useMemo(() => {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
        <Typography variant="h6" color={theme.palette.primary.light}>
          {window.localStorage.getItem("name")}
        </Typography>
        <Typography
          variant="caption"
          color={theme.palette.primary.light}
          fontWeight={"bold"}
        >
          @{window.localStorage.getItem("username")}
        </Typography>
      </Box>
    );
  }, [theme.palette]);

  const tabs = useMemo(() => {
    return (
      <Box
        sx={{
          maxWidth: "400px",
          backgroundColor: theme.palette.secondary.light,
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: 10,
          my: 10,
          mx: "auto",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="transparent"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          slotProps={{
            scrollButtons: { sx: { color: theme.palette.primary.main } },
          }}
        >
          <Tab value="posts" label="posts" />
          <Tab value="likes" label="likes" />
          <Tab value="shares" label="shares" />
          <Tab value="followers" label="followers" />
          <Tab value="following" label="following" />
        </Tabs>
      </Box>
    );
  }, [
    handleChange,
    theme.palette.primary.main,
    theme.palette.secondary.light,
    value,
  ]);

  const profileContent = useMemo(() => {
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
        {value === "posts" && <ProfilePosts />}
        {value === "shares" && <ProfileShares />}
        {value === "likes" && <ProfileLikes />}
        {value === "followers" && <ProfileFollowers />}
        {value === "following" && <ProfileFollowing />}
      </Box>
    );
  }, [value]);

  const element = useMemo(() => {
    return (
      <Box sx={{ py: 2 }}>
        {top}
        {info}
        {tabs}
        {profileContent}
      </Box>
    );
  }, [info, profileContent, tabs, top]);

  return element;
};

export default Profile;
