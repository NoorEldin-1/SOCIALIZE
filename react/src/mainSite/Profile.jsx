import { Box, Button, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ProfilePosts from "./ProfilePosts";
import ProfileShares from "./ProfileShares";
import ProfileLikes from "./ProfileLikes";
import ProfileFollowing from "./ProfileFollowing";
import ProfileFollowers from "./ProfileFollowers";

const Profile = () => {
  const theme = useTheme();
  const [value, setValue] = useState("posts");
  const [toggleFollow, setToggleFollow] = useState(false);
  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <Box sx={{ py: 2 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <img
          src="https://i.pinimg.com/736x/ad/a7/72/ada772b26a0e6dded8523d3a596fc569.jpg"
          alt="cover photo"
          style={{
            width: "100%",
            height: "250px",
            overflow: "hidden",
            borderRadius: 25,
            objectFit: "cover",
          }}
        />
        <img
          src="../../public/guest.png"
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
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={2}
        gap={1}
      >
        <Typography
          variant="h6"
          color={theme.palette.getContrastText(
            theme.palette.background.default
          )}
          py={1}
          px={5}
          bgcolor={theme.palette.background.default}
          borderRadius={50}
        >
          full name
        </Typography>
        <Typography
          variant="caption"
          color="primary"
          p={1}
          bgcolor={theme.palette.background.default}
          borderRadius={50}
          fontWeight={"bold"}
        >
          @username
        </Typography>
      </Box>
      <Box display="flex" gap={1} mt={2} justifyContent="center">
        <Button
          onClick={() => setToggleFollow(!toggleFollow)}
          variant="contained"
          size="small"
          color="primary"
          endIcon={toggleFollow ? <PersonRemoveIcon /> : <PersonAddIcon />}
          sx={{ borderRadius: 50 }}
        >
          {toggleFollow ? "un follow" : "follow"}
        </Button>
        <Button
          variant="contained"
          size="small"
          endIcon={<ChatIcon />}
          sx={{ borderRadius: 50 }}
        >
          chat
        </Button>
      </Box>
      <Box
        sx={{
          maxWidth: "400px",
          backgroundColor: theme.palette.background.paper,
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
    </Box>
  );
};

export default Profile;
