import React from "react";
import { Link, NavLink } from "react-router-dom";
// import { confirmationPage } from '../features/cart/cartSlice';

const ConfirmationPage = () => {
  const max = 100000000000;
  const min = 1000;

  let orderNumber = Math.floor(Math.random() * (max - min + 1));

  return (
    <div className="confirmation-page">
      <h1 className="confirmationTitleText">We've received your order!</h1>
      <h1 className="confirmationSubText">Here are your order details. </h1>
      <h3 className="confirmationOrderNum">{`Order Number: #${orderNumber}`}</h3>
      <NavLink to="/home">
        <button className="backToHomeButton">Back to Home</button>
      </NavLink>
    </div>
  );
};

export default ConfirmationPage;
