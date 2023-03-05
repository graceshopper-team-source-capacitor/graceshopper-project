import React, { useEffect, useState } from "react";
import {
  fetchSingleProductAsync,
  selectSingleProduct,
} from "./singleProductSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { incrementByAmount } from "../cart/guestCartSlice";
import { addLineItemAsync } from "../cart/cartSlice";

const Product = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector(selectSingleProduct);

  const [amount, setAmount] = useState(1);
  const [cart, setCart] = useState([]);

  // on first render, gets the cart saved in local storage
  // local storage persist on refresh
  useEffect(() => {
    try {
      // USER CART READS AND WRITES FROM/TO LOCAL STORAGE
      // IF LOGGED IN, SET LS CART TO DB CART
      // IF NOT LOGGED IN CONTINUE BELOW
      let localCart = localStorage.getItem("cart") || "";
      // convert cart into json because local storage can only read strings & primative types
      let jsonCart = JSON.parse(localCart);
      if (localCart) setCart(jsonCart);
    } catch (err) {}
  }, []);

  // when cart updates set cart local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    dispatch(fetchSingleProductAsync(id));
  }, [dispatch]);

  const subtractFromAmount = () => {
    setAmount(amount - 1);
  };

  const addToAmount = () => {
    setAmount(amount + 1);
  };

  const addToCart = (id, amount) => {
    // returns the product object if it exists in the local storage cart
    const itemAlreadyInCart = cart.find(
      (cartItem) => cartItem.id === product.id
    );
    // returns the product object index if it exists in the local storage cart
    const itemAlreadyInCartIndex = cart.findIndex(
      (cartItem) => cartItem.id === product.id
    );

    // the product object plus a new key value pair of quanity of product
    const addedItem = { ...product, qty: amount };

    if (cart.length === 0) {
      setCart([addedItem]);
    } else if (cart.length > 0) {
      //if the item does not already exist in the local storage cart
      if (itemAlreadyInCart === undefined) {
        const newCart = [...cart, addedItem];
        // add that item to the local storage cart
        setCart(newCart);
      } else {
        // if the item already exists in local storage cart, update the quantity
        cart[itemAlreadyInCartIndex].qty = itemAlreadyInCart.qty + amount;
        setCart([...cart]);
      }
    }
    // add amount of items to the total number of items
    // needed to update navbar cart counter
    // dispatch(incrementByAmount(amount))
    dispatch(addLineItemAsync(id, amount));
  };

  return (
    <div className="singleProductParentDiv">
      <img src={`/${product.imageUrl}`} />
      <div className="singleProductInfo">
        <p className="productNameSingleProduct">{product.name}</p>
        <p className="productDescription">{product.description}</p>
        <p className="productPrice">${Number(product.price).toFixed(2)}</p>
        <div className="buttonsDiv">
          <div className="qtyButton">
            <button onClick={subtractFromAmount} className="qtyButtonPlusMinus">
              -
            </button>
            <p className="qtyText">{amount}</p>
            <button onClick={addToAmount} className="qtyButtonPlusMinus">
              +
            </button>
          </div>
          <button
            onClick={() => addToCart(product.id, amount)}
            className="addToCartButton"
          >
            Add to Cart
          </button>
        </div>
        <p className="productTypeSpecialty">{product.type}</p>
      </div>
    </div>
  );
};

export default Product;
