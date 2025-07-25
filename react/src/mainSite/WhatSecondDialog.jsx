import { useSelector } from "react-redux";
import Share from "./Share";

const WhatSecondDialog = () => {
  const dialog = useSelector((state) => state.secondDialog);

  if (dialog === "share") return <Share />;
};

export default WhatSecondDialog;
