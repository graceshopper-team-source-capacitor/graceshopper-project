import React from "react";
import { useSelector } from "react-redux";

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div className="homePageParentDiv">
      {/* <h3>Welcome, {username}</h3> */}
      <h1 className="homeTitleText">HOP MART</h1>
    </div>
  );
};

export default Home;
