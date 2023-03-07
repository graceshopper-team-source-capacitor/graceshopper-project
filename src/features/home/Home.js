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
      <img className="homeImage" src="bag.png" />
      <div className="homeCategories">
        <div className="homeBakery">
          <p className="homeCategoryText">Bakery</p>
        </div>
        <div className="homeProduce">
          <p className="homeCategoryText">Produce</p>
        </div>
        <div className="homeDairy">
          <p className="homeCategoryText">Dairy</p>
        </div>
        <div className="homeSpecialty">
          <p className="homeCategoryText">Snacks</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
