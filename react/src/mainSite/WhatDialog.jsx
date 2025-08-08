import { useSelector } from "react-redux";
import Logout from "./Logout";
import DeleteAccount from "./DeleteAccount";
import Post from "./Post";
import AddPost from "./AddPost";
import AccountSettings from "./AccountSettings";
import DeletePost from "./DeletePost";

const WhatDialog = () => {
  const dialog = useSelector((state) => state.dialog);

  if (dialog === "forYouPost") return <Post place="forYou" />;
  if (dialog === "myPost") return <Post place="myPost" />;
  if (dialog === "logout") return <Logout />;
  if (dialog === "delete account") return <DeleteAccount />;
  if (dialog === "addPost") return <AddPost />;
  if (dialog === "accountSettings") return <AccountSettings />;
  if (dialog === "delete post") return <DeletePost />;
};

export default WhatDialog;
