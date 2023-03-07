import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { increment } from '../cart/guestCartSlice'
import { decrement } from '../cart/guestCartSlice'

/**
 * COMPONENT
 */
const GuestCart = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [cart, setCart] = useState([])

  // on first render, gets the cart saved in local storage
  // local storage persist on refresh
  useEffect(() => {
    try {
      let localCart = localStorage.getItem('cart') || ''
      // convert cart into json because local storage can only read strings & primative types
      let jsonCart = JSON.parse(localCart)
      if (localCart) setCart(jsonCart)
    } catch (err) {}
  }, [])

  // when cart updates set cart local storage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // SUBTRACTING ITEM QTY IN CART (START)
  function subtractFromQty(index, cart) {
    // if the cart item quantiy is more than 1
    if (cart[index].qty > 1) {
      // subract one from the qty
      cart[index].qty = cart[index].qty - 1
      // set the cart (with new item qty)
      // need to create a clone of cart since you cannot modify state directly
      setCart(structuredClone(cart))
    } else if ((cart[index].qty = 1)) {
      //if the cart item qty is one, remove that item from the cart
      removeFromCart(index, cart)
    }
    // subtract one to the total number of items
    // needed to update navbar cart counter
    dispatch(decrement())
  }
  // SUBTRACTING ITEM QTY IN CART (END)

  // ADDING ITEM QTY IN CART (START)
  function addToQty(index, cart) {
    // add one to that cart item's qty
    cart[index].qty = cart[index].qty + 1
    // set the cart (with new item qty)
    // need to create a clone of cart since you cannot modify state directly
    setCart(structuredClone(cart))
    // add one to the total number of items
    // needed to update navbar cart counter
    dispatch(increment())
  }
  // ADDING ITEM QTY IN CART (END)

  // REMOVING ITEM FROM CART (START)
  const removeFromCart = (index, cart) => {
    // delete one item at index from the cart
    let splicedCart = cart.splice(index, 1)
    // set the cart (not including the removed item)
    // need to create a clone of cart since you cannot modify state directly
    setCart(structuredClone(cart))
  }
  // REMOVING ITEM FROM CART (END)

  // TOTAL CART PRICE (START)
  // creates an array of all prices in local cart
  const cartPriceArray = []
  for (let i = 0; i < cart.length; i++) {
    cartPriceArray.push(cart[i].price * cart[i].qty)
  }

  // adds all the prices together
  const initialValue = 0
  const sumOfPrices = cartPriceArray.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  )
  // TOTAL CART PRICE (END)

  function handleCheckoutButton() {
    navigate('/confirm')
  }

  return (
    <div className="cartParentDiv">
      <h3 className="cartTitleText">CART</h3>
      <div className="allCartProductsParentDiv">
        {cart.map((item, index) => (
          <div className="cartProductParentDiv" key={item.id}>
            <img src={item.imageUrl} />
            <div className="cartProductInfo">
              <h4 className="productNameSingleProductPurple">{item.name}</h4>
              <h4 className="productPricePurple">
                Total Price: ${Number(item.qty * item.price).toFixed(2)}
              </h4>
              <div className="qtyButtonPurple">
                <button
                  className="qtyButtonPlusMinusPurple"
                  onClick={() => subtractFromQty(index, cart)}
                >
                  -
                </button>
                <h4 className="qtyTextPurple">{item.qty}</h4>
                <button className="qtyButtonPlusMinusPurple" onClick={() => addToQty(index, cart)}>
                  +
                </button>
              </div>
              <button className="cartRemove" onClick={() => removeFromCart(index, cart)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <hr className="cartDivider"></hr>
      <div className="cartTotalDiv">
        <h4 className="cartTotalDarkPurple">Cart Total: ${sumOfPrices.toFixed(2)}</h4>
        <button className="checkoutButton" onClick={handleCheckoutButton}>
          Checkout
        </button>
      </div>
    </div>
  )
}

export default GuestCart
