import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import AuthForm from '../features/auth/AuthForm'
import Home from '../features/home/Home'
import ProductList from '../features/products/allproducts'
import UserProfile from '../features/userProfile/UserProfile'
import { me } from './store'

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(me())
  }, [])

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          {/* <Route path="/*" element={<Home />} /> */}
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/*" element={<AuthForm name="login" displayName="Login" />} />
          <Route path="/login" element={<AuthForm name="login" displayName="Login" />} />
          <Route path="/signup" element={<AuthForm name="signup" displayName="Sign Up" />} />
          <Route path="/products" element={<ProductList />} />
        </Routes>
      )}
      {/* <Routes>
        <Route path="/products" element={<ProductList />} />
      </Routes> */}
    </div>
  )
}

export default AppRoutes
