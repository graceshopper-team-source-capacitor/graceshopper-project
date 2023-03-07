// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// // import AdminProfile from '../admin/AdminProfile';
// // import Login from '../login/Login';
// // import { logout } from '../login/loginSlice';
// import { Link } from "react-router-dom";

// const UserProfile = () => {
//   const dispatch = useDispatch();
//     const loggedInUser = useSelector((state) => state.auth.me)
// console.log(loggedInUser)
//   return (
//     <div className="view-profile-container">
//       {!loggedInUser.id ? (
//         <Login />
//       ) : loggedInUser.isAdmin ? (
//         <AdminProfile />
//       ) : (
//         <div className="loggedInUser-profile">
//           <div className="login-box-wrapper">
//             <h2>Welcome, {loggedInUser.username}!</h2>
//             <div className="user-info">
//               <div className="user-name user">
//                 {loggedInUser.firstName} {loggedInUser.lastName}
//               </div>
//             </div>
//           </div>
//           {loggedInUser.id.length? (
//             <div className="user-box-wrapper">
//               <h4>Previous Orders:</h4>
//               <div>
//                 {loggedInUser.orders.map((order) => {
//                   if (!order.isCart) {
//                     return (
//                       <div key={order.id}>
//                         <p>Shipped To: {order.shippingAddress}</p>
//                         {order.lineItems.map((product) => (
//                           <div key={product.id}>
//                             <div>
//                               {product.product.name}, Qty: {product.quantity}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     );
//                   }
//                 })}
//               </div>
//             </div>
//           ) : null}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;

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
