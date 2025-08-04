import { useSelector } from "react-redux";
import Logout from "./Logout";
import DeleteAccount from "./DeleteAccount";
import Share from "./Share";
import Post from "./Post";
import AddPost from "./AddPost";
import AccountSettings from "./AccountSettings";
import Chat from "./Chat";
import DeletePost from "./DeletePost";
import MainPost from "./MainPost";

const WhatDialog = () => {
  const dialog = useSelector((state) => state.dialog);

  if (dialog === "post") return <Post />;
  if (dialog === "logout") return <Logout />;
  if (dialog === "delete account") return <DeleteAccount />;
  if (dialog === "share") return <Share />;
  if (dialog === "addPost") return <AddPost />;
  if (dialog === "accountSettings") return <AccountSettings />;
  if (dialog === "chat") return <Chat />;
  if (dialog === "delete post") return <DeletePost />;
  if (dialog === "main post") return <MainPost />;
};

export default WhatDialog;
