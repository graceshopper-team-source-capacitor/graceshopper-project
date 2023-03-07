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

  const [cart, setCart] = useState([])

  // useEffect(() => {
  //   try {
  //     let localCart = localStorage.getItem('cart') || ''
  //     let jsonCart = JSON.parse(localCart)
  //     if (localCart) setCart(jsonCart)
  //   } catch (err) {}
  // }, [])

  // console.log('cart', cart)

  // const totalNumItems = []
  // for (let i = 0; i < cart.length; i++) {
  //   totalNumItems.push(cart[i].qty)
  // }

  // const initialValue = 0
  // const sumOfQtys = totalNumItems.reduce(
  //   (previousValue, currentValue) => previousValue + currentValue,
  //   initialValue
  // )

  return (
    <div>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/" className="navLink">
              Home
            </Link>
            <button className="navLink" type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
            <Link to="/products" className="navLink">
              Products
            </Link>
            <Link to="/cart" className="navLink">
              Cart
            </Link>
            <hr></hr>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/" className="navLink">
              Home
            </Link>
            <Link to="/login" className="navLink">
              Login
            </Link>
            <Link to="/signup" className="navLink">
              Sign Up
            </Link>
            <Link to="/products" className="navLink">
              Products
            </Link>
            {/* <Link to="/cart" className="navLink">
              Cart
            </Link> */}
            <Link to="/cart" className="navLink">
              Cart({numItemsInCart >= 0 ? numItemsInCart : 0})
            </Link>
            {/* <Link to="/cart">Cart</Link> */}
            <hr></hr>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar
