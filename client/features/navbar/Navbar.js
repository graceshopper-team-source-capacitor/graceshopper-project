import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../app/store'
import { selectGuestCart } from '../cart/guestCartSlice'

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id)
  const numItemsInCart = useSelector((state) => state.guestCart.numItemsInCart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutAndRedirectHome = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div>
      <h1>FS-App-Template</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart({numItemsInCart})</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
}

export default Navbar
