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
      <div className="homeCategories">
        <div className="homeBakery">
          <img />
          <p className="homeCategoryText">Bakery</p>
        </div>
        <div className="homeProduce">
          <img />
          <p className="homeCategoryText">Produce</p>
        </div>
        <div className="homeDairy">
          <img />
          <p className="homeCategoryText">Dairy</p>
        </div>
        <div className="homeSpecialty">
          <img />
          <p className="homeCategoryText">Snacks</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
