import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUsers, fetchUsersAsync } from "./userListSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  //Already has a get route that accesses the appropriate data (id and username)
  //need to request reducer in the store

  return (
    <div className="userListParentDiv">
      <h1 className="profileTitleText">All Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="userListLi">
            {/* <button className="delete" onClick={() => handleDelete(user.id)}>X</button> */}
            {/* <NavLink
            to={`/users/${user.id}`}
            key={`All users: ${user.id}`}
          > */}
            <h2 className="userListNames">{user.username}</h2>
            {/* </NavLink> */}
            {/* <img src={`/${user.imageUrl}`} /> */}
            {/* <NavLink to={`/allusers/${user.id}/edit`}>
            <button>Edit</button>
          </NavLink> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
