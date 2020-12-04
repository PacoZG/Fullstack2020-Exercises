import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.user);

  if (user === null) {
    return (
      <div className={"headerStyle"}>
        <h1>{"Log in to application"}</h1>
      </div>
    );
  } else {
    return (
      <div className={"headerStyle"}>
        <h1>{"Blogs"}</h1>
      </div>
    );
  }
};

export default Header;
