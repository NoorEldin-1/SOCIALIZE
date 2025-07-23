import { useSelector } from "react-redux";
import Logout from "./Logout";
import DeleteAccount from "./DeleteAccount";

const WhatDialog = () => {
  const dialog = useSelector((state) => state.dialog);

  if (dialog === "logout") return <Logout />;
  if (dialog === "delete account") return <DeleteAccount />;
};

export default WhatDialog;
