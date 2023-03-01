import React from 'react'
import { useSelector } from 'react-redux'

const SingleUser = (props) => {
  // const username = useSelector((state) => state.auth.me.username)
  const me = useSelector((state) => state.auth.me)
  // console.log('j image', j.imageUrl)
  // console.log('admin', password)
  return (
    <div>
      <h1>single user</h1>
      <h3>Name: {me.username}</h3>
      <h3>Admin: {me.isAdmin}</h3>
      <img src={`../../../public/${me.imageUrl}`} />
    </div>
  )
}

export default SingleUser
