import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const UserProfile = (props) => {
  const loggedInUser = useSelector((state) => state.auth.me)

  return (
    <div>
      <h1>User profile</h1>
      <h3>Name: {loggedInUser.username}</h3>
      <h3>Admin: {loggedInUser.isAdmin.toString()}</h3>
      <img src={`${loggedInUser.imageUrl}`} />
    </div>
  )
}

export default UserProfile
