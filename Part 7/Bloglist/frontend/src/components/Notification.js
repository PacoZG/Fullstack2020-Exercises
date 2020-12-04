import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  console.log("NOTIFICATION INSIDE COMPONENT:", notification);

  const message = notification.message;
  const colorClass = notification.color;

  if (message === null) {
    return null;
  }

  return <div className={colorClass}>{message}</div>;
};

export default Notification;
