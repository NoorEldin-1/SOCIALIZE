import { useTheme } from "@emotion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getProfile } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { profilePosts } from "../features/postSlice";
import { follow, getFollow } from "../features/followSlice";
import { showDialog } from "../features/dialogSlice";
import {
  Box,
  Button,
  Tabs,
  Tab,
  Typography,
  CircularProgress,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ChatIcon from "@mui/icons-material/Chat";
import AnotherProfilePosts from "./AnotherProfilePosts";
import AnotherProfileShares from "./AnotherProfileShares";
import AnotherProfileLikes from "./AnotherProfileLikes";
import AnotherProfileFollowers from "./AnotherProfileFollowers";
import AnotherProfileFollowing from "./AnotherProfileFollowing";

const AnotherProfile = () => {
  const { username } = useParams();
  const theme = useTheme();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);
  const isFollow = useSelector((state) => state.follow.isFollow);
  const [toggleFollowUI, setToggleFollowUI] = useState("unFollow");
  const [value, setValue] = useState("posts");
  const handleChange = useCallback((_, newValue) => setValue(newValue), []);
  const navigate = useNavigate();
  const profileLoading = useSelector((state) => state.auth.profileLoading);
  const followLoading = useSelector((state) => state.follow.followLoading);

  useEffect(() => {
    if (username === window.localStorage.getItem("username")) {
      navigate("/");
    }
  }, [navigate, username]);

  useEffect(() => {
    if (username) {
      dispatch(getProfile(username));
      dispatch(profilePosts(username));
      dispatch(
        getFollow({
          info: {
            fromUserId: window.localStorage.getItem("userId"),
            toUserId: profile.id,
          },
        })
      );
      if (isFollow === "follow") {
        setToggleFollowUI("follow");
      } else {
        setToggleFollowUI("unFollow");
      }
    }
  }, [dispatch, isFollow, profile.id, username]);

  let timeout = useRef(null);
  const handleFollow = useCallback(
    (e) => {
      setToggleFollowUI(toggleFollowUI === "unFollow" ? "follow" : "unFollow");
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      timeout.current = setTimeout(() => {
        console.log(e.target.innerText);
        dispatch(
          follow({
            info: {
              fromUserId: window.localStorage.getItem("userId"),
              toUserId: profile.id,
              isFollow: e.target.innerText,
            },
          })
        );
      }, 2000);
    },
    [dispatch, profile.id, toggleFollowUI]
  );

  const top = useMemo(() => {
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <img
          src={
            profile.coverImage ? profile.coverImage : "../../public/cover.jpg"
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
            profile.profileImage
              ? profile.profileImage
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
    profile.coverImage,
    profile.profileImage,
    theme.palette.background.default,
    theme.palette.primary.main,
    theme.shadows,
  ]);

  const info = useMemo(() => {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
        <Typography variant="h6" color={theme.palette.primary.light}>
          {profile.name}
        </Typography>
        <Typography
          variant="caption"
          color={theme.palette.primary.light}
          fontWeight={"bold"}
        >
          @{profile.username}
        </Typography>
      </Box>
    );
  }, [profile.name, profile.username, theme.palette.primary.light]);

  const actions = useMemo(() => {
    return (
      <Box display="flex" gap={1} mt={2} justifyContent="center">
        <Button
          onClick={handleFollow}
          variant="contained"
          size="small"
          color="primary"
          endIcon={
            toggleFollowUI === "unFollow" ? (
              <PersonAddIcon />
            ) : (
              <PersonRemoveIcon />
            )
          }
          sx={{
            borderRadius: 50,
            ":hover": { bgcolor: theme.palette.primary.main },
          }}
        >
          {toggleFollowUI === "unFollow" ? "follow" : "un follow"}
        </Button>
        <Button
          variant="contained"
          size="small"
          endIcon={<ChatIcon />}
          sx={{
            borderRadius: 50,
            ":hover": { bgcolor: theme.palette.primary.main },
          }}
          onClick={() => dispatch(showDialog("chat"))}
        >
          chat
        </Button>
      </Box>
    );
  }, [dispatch, handleFollow, theme.palette.primary.main, toggleFollowUI]);

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
        {value === "posts" && <AnotherProfilePosts />}
        {value === "shares" && <AnotherProfileShares />}
        {value === "likes" && <AnotherProfileLikes />}
        {value === "followers" && <AnotherProfileFollowers />}
        {value === "following" && <AnotherProfileFollowing />}
      </Box>
    );
  }, [value]);

  const element = useMemo(() => {
    return (
      <Box sx={{ py: 2 }}>
        {top}
        {info}
        {actions}
        {tabs}
        {profileContent}
      </Box>
    );
  }, [actions, info, profileContent, tabs, top]);

  if (profileLoading === "true" || followLoading === "true") {
    return <CircularProgress sx={{ display: "block", mx: "auto" }} />;
  } else {
    return element;
  }
};

export default AnotherProfile;
