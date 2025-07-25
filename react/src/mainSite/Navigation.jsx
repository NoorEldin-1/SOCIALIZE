import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { useEffect, useMemo } from "react";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import { useNavigate } from "react-router";

const Navigation = ({ value, setValue }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") setValue(1);
    else if (window.location.pathname === "/for-you") setValue(0);
    else if (window.location.pathname === "/following") setValue(2);
    else setValue(null);
  }, [setValue]);

  const element = useMemo(() => {
    return (
      <Box
        sx={{
          position: "fixed",
          bottom: 10,
          left: "50%",
          transform: "translateX(-50%)",
          width: "300px",
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(e, newValue) => {
            const pageValue = e.currentTarget.children[1].textContent;
            setValue(newValue);
            if (pageValue === "community") navigate("/");
            else navigate(`/${pageValue.split(" ").join("-").toLowerCase()}`);
          }}
          sx={{
            "& .MuiBottomNavigationAction-label": {
              textTransform: "capitalize",
            },
            borderRadius: 10,
            boxShadow: 20,
          }}
        >
          <BottomNavigationAction label="for you" icon={<ViewWeekIcon />} />
          <BottomNavigationAction label="community" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="following" icon={<Diversity1Icon />} />
        </BottomNavigation>
      </Box>
    );
  }, [navigate, setValue, value]);

  return element;
};

export default Navigation;
