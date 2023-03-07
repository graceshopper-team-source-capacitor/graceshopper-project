import React from "react";
import { Link, NavLink } from "react-router-dom";
// import { confirmationPage } from '../features/cart/cartSlice';

const ConfirmationPage = () => {
  const max = 100000000000;
  const min = 1000;

  let orderNumber = Math.floor(Math.random() * (max - min + 1));

  return (
    <div className="confirmation-page">
      <h1>We've received your order!</h1>
      <h1>Here are your order details </h1>
      <h3>{`Order Number: #${orderNumber}`}</h3>
      {/* <NavLink to='/products'>
                <button>Back to Homepage</button>
            </NavLink> */}
    </div>
  );
};

export default ConfirmationPage;
