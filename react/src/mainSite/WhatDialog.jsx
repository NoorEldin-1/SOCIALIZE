import { useSelector } from "react-redux";
import Logout from "./Logout";
import DeleteAccount from "./DeleteAccount";
import Share from "./Share";
import Post from "./Post";
import AddPost from "./AddPost";

const WhatDialog = () => {
  const dialog = useSelector((state) => state.dialog);

  if (dialog === "post") return <Post />;
  if (dialog === "logout") return <Logout />;
  if (dialog === "delete account") return <DeleteAccount />;
  if (dialog === "share") return <Share />;
  if (dialog === "addPost") return <AddPost />;
};

export default WhatDialog;
