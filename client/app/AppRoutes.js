import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import ProductList from "../features/products/allproducts";
import UserProfile from "../features/users/UserProfile";
import { me } from "./store";
import Product from "../features/products/singleproduct";
import GuestCart from "../features/cart/GuestCart";
import UserList from "../features/users/UserList";
import EditProduct from "../features/products/editproduct";
import AddProduct from "../features/products/addproduct";
import ConfirmationPage from "../features/confirmationPage/confirmationPage";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const loggedInAdmin = useSelector((state) => !!state.auth.me.isAdmin);
  const dispatch = useDispatch();

  console.log(useSelector((state) => state.auth.me.isAdmin));

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn &&
        <Routes>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<Product />} />
        </Routes>}
      {!isLoggedIn &&
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/cart" element={<GuestCart />} />
        </Routes>
      }
      {isLoggedIn && loggedInAdmin && (
        <Routes>
          <Route path="/products/:id/edit" element={<EditProduct />} />
          <Route path="products/new" element={<AddProduct />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/confirm" element={<ConfirmationPage />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
