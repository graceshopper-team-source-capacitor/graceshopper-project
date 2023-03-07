import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const UserProfile = (props) => {
  const loggedInUser = useSelector((state) => state.auth.me);

  return (
    <div className="profileParentDiv">
      <h1 className="profileTitleText">{loggedInUser.username}'s Profile</h1>
      <h3 className="profileSubText">Name: {loggedInUser.username}</h3>
      <h3 className="profileSubText">
        Admin: {loggedInUser.isAdmin.toString()}
      </h3>
      {/* <img src={`${loggedInUser.imageUrl}`} /> */}
    </div>
  );
};

export default UserProfile;
