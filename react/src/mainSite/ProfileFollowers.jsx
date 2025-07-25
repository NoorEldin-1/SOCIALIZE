import { Box, ButtonBase, Typography, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const ProfileFollowers = () => {
  const theme = useTheme();
  const [tabList, setTabList] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setTabList(
      Array.from({ length: 20 }).map((_, i) => {
        return (
          <Tab
            key={i}
            disableRipple
            label={
              <Box
                onClick={() => navigate(`/profile`)}
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
                  src="https://i.pinimg.com/1200x/fe/fa/b7/fefab7e28dd667bdeac6272fb78715f3.jpg"
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
                    src="https://i.pinimg.com/736x/b8/fb/de/b8fbde04ded2abd85444582398c6d151.jpg"
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
                  full name
                </Typography>
                <Typography
                  variant="caption"
                  color="primary"
                  textTransform={"none"}
                  fontWeight={"bold"}
                >
                  @username
                </Typography>
              </Box>
            }
          />
        );
      })
    );
  }, [navigate, theme.palette]);
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
    </Box>
  );
};

export default ProfileFollowers;
