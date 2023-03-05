import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import { selectGuestCart } from "../cart/guestCartSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const numItemsInCart = useSelector((state) => state.guestCart.numItemsInCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home" className="navLink">
              Home
            </Link>
            <button
              className="navLink"
              type="button"
              onClick={logoutAndRedirectHome}
            >
              Logout
            </button>
            <Link to="/products" className="navLink">
              Products
            </Link>
            <Link to="/cart" className="navLink">
              Cart
            </Link>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login" className="navLink">
              Login
            </Link>
            <Link to="/signup" className="navLink">
              Sign Up
            </Link>
            <Link to="/products" className="navLink">
              Products
            </Link>
            <Link to="/cart" className="navLink">
              Cart({numItemsInCart})
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
