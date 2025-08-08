import {
  Box,
  CircularProgress,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ProfilePosts from "./ProfilePosts";
import ProfileShares from "./ProfileShares";
import ProfileLikes from "./ProfileLikes";
import ProfileFollowing from "./ProfileFollowing";
import ProfileFollowers from "./ProfileFollowers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getProfile } from "../features/authSlice";
import { follow, getFollow } from "../features/followSlice";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Button from "@mui/material/Button";
import { translate } from "../main";

const Profile = ({ place }) => {
  const { username } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = useState("posts");
  const dispatch = useDispatch();
  const handleChange = useCallback((_, newValue) => setValue(newValue), []);
  const profile = useSelector((state) => state.auth.profile);
  const isFollow = useSelector((state) => state.follow.isFollow);
  const [toggleFollowUI, setToggleFollowUI] = useState("unFollow");
  const profileLoading = useSelector((state) => state.auth.profileLoading);
  const paginateLoading = useSelector((state) => state.post.paginateLoading);

  useEffect(() => {
    if (!username) {
      navigate("/");
    }
    if (username && username === window.localStorage.getItem("username")) {
      navigate("/");
    }
  }, [navigate, username]);

  useEffect(() => {
    if (username && username !== window.localStorage.getItem("username")) {
      dispatch(
        getFollow({
          info: {
            fromUserId: window.localStorage.getItem("userId"),
            toUserId: profile.id,
          },
        })
      );
      dispatch(getProfile(username));
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
        dispatch(
          follow({
            info: {
              fromUserId: window.localStorage.getItem("userId"),
              toUserId: profile.id,
              isFollow: e.target.innerText,
            },
          })
        );
      }, 150);
    },
    [dispatch, profile.id, toggleFollowUI]
  );

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

  const anotherProfileTop = useMemo(() => {
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
          {window.localStorage.getItem("name")}
        </Typography>
        <Typography
          variant="caption"
          color={theme.palette.primary.light}
          fontWeight={"bold"}
        >
          {window.localStorage.getItem("username")}
        </Typography>
      </Box>
    );
  }, [theme.palette]);

  const anotherProfileInfo = useMemo(() => {
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
          {profile.username}
        </Typography>
      </Box>
    );
  }, [profile.name, profile.username, theme.palette.primary.light]);

  const anotherProfileActions = useMemo(() => {
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
          {toggleFollowUI === "unFollow"
            ? translate("follow")
            : translate("un follow")}
        </Button>
      </Box>
    );
  }, [handleFollow, theme.palette.primary.main, toggleFollowUI]);

  const tabs = useMemo(() => {
    return (
      <Box
        sx={{
          maxWidth: "400px",
          backgroundColor: theme.palette.primary.dark,
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
          <Tab
            value="posts"
            label={translate("posts")}
            sx={{ color: theme.palette.primary.light }}
          />
          <Tab
            value="likes"
            label={translate("likes")}
            sx={{ color: theme.palette.primary.light }}
          />
          <Tab
            value="shares"
            label={translate("shares")}
            sx={{ color: theme.palette.primary.light }}
          />
          <Tab
            value="followers"
            label={translate("followers")}
            sx={{ color: theme.palette.primary.light }}
          />
          <Tab
            value="following"
            label={translate("following")}
            sx={{ color: theme.palette.primary.light }}
          />
        </Tabs>
      </Box>
    );
  }, [
    handleChange,
    theme.palette.primary.dark,
    theme.palette.primary.light,
    theme.palette.primary.main,
    value,
  ]);

  const anotherProfileTabs = useMemo(() => {
    return (
      <Box
        sx={{
          maxWidth: "400px",
          backgroundColor: theme.palette.primary.dark,
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
          <Tab
            value="posts"
            label={translate("posts")}
            sx={{ color: theme.palette.primary.light }}
          />
          <Tab
            value="likes"
            label={translate("likes")}
            disabled={profile.showLikes === 1 ? false : true}
            sx={{ color: theme.palette.primary.light }}
          />
          <Tab
            value="shares"
            label={translate("shares")}
            disabled={profile.showShares === 1 ? false : true}
            sx={{ color: theme.palette.primary.light }}
          />
          <Tab
            value="followers"
            label={translate("followers")}
            disabled={profile.showFollowers === 1 ? false : true}
            sx={{ color: theme.palette.primary.light }}
          />
          <Tab
            value="following"
            label={translate("following")}
            disabled={profile.showFollowing === 1 ? false : true}
            sx={{ color: theme.palette.primary.light }}
          />
        </Tabs>
      </Box>
    );
  }, [
    handleChange,
    profile,
    theme.palette.primary.dark,
    theme.palette.primary.light,
    theme.palette.primary.main,
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
        {value === "posts" && <ProfilePosts place={"myProfilePosts"} />}
        {value === "shares" && <ProfileShares place={"profileShares"} />}
        {value === "likes" && <ProfileLikes place={"profileLikes"} />}
        {value === "followers" && <ProfileFollowers />}
        {value === "following" && <ProfileFollowing />}
        {paginateLoading === "true" && (
          <CircularProgress sx={{ display: "block" }} />
        )}
      </Box>
    );
  }, [paginateLoading, value]);

  const anotherProfileContent = useMemo(() => {
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
        {value === "posts" && <ProfilePosts place={"anotherProfilePosts"} />}
        {value === "shares" && <ProfileShares place={"profileShares"} />}
        {value === "likes" && <ProfileLikes place={"profileLikes"} />}
        {value === "followers" && <ProfileFollowers />}
        {value === "following" && <ProfileFollowing />}
        {paginateLoading === "true" && (
          <CircularProgress sx={{ display: "block" }} />
        )}
      </Box>
    );
  }, [paginateLoading, value]);

  const myProfileElement = useMemo(() => {
    return (
      <Box sx={{ py: 2 }}>
        {top}
        {info}
        {tabs}
        {profileContent}
      </Box>
    );
  }, [info, profileContent, tabs, top]);

  const anotherProfileElement = useMemo(() => {
    return (
      <Box sx={{ py: 2 }}>
        {anotherProfileTop}
        {anotherProfileInfo}
        {anotherProfileActions}
        {anotherProfileTabs}
        {anotherProfileContent}
      </Box>
    );
  }, [
    anotherProfileActions,
    anotherProfileContent,
    anotherProfileInfo,
    anotherProfileTabs,
    anotherProfileTop,
  ]);

  if (place === "myProfile") {
    return myProfileElement;
  } else if (place === "anotherProfile") {
    if (profileLoading === "true") {
      return <CircularProgress sx={{ display: "block", mx: "auto" }} />;
    } else {
      return anotherProfileElement;
    }
  }
};

export default Profile;
