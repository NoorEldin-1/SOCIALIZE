import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { useEffect, useMemo } from "react";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router";
import { useTheme } from "@mui/material/styles";
import { translate } from "../main";

const Navigation = ({ value, setValue }) => {
  const navigate = useNavigate();
  const theme = useTheme();

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
            if (pageValue === "profile" || pageValue === "صفحتك") navigate("/");
            if (pageValue === "following" || pageValue === "المتابعين")
              navigate("/following");
            if (pageValue === "for you" || pageValue === "تصفح")
              navigate("/for-you");
          }}
          sx={{
            "& .MuiBottomNavigationAction-label": {
              textTransform: "capitalize",
              color: theme.palette.primary.light,
            },
            borderRadius: 10,
            boxShadow: 20,
            bgcolor: theme.palette.primary.dark,
          }}
        >
          <BottomNavigationAction
            label={translate("for you")}
            icon={<ViewWeekIcon />}
          />
          <BottomNavigationAction
            label={translate("profile")}
            icon={<PersonIcon />}
          />
          <BottomNavigationAction
            label={translate("following")}
            icon={<Diversity1Icon />}
          />
        </BottomNavigation>
      </Box>
    );
  }, [
    navigate,
    setValue,
    theme.palette.primary.dark,
    theme.palette.primary.light,
    value,
  ]);

  return element;
};

export default Navigation;
