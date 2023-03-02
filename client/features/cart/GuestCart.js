import React, { useState, useEffect } from 'react'

// TODO:
// add to cart qty,
// subtract from cart qty,

/**
 * COMPONENT
 */
const GuestCart = (props) => {
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
  }
  // SUBTRACTING ITEM QTY IN CART (END)

  // ADDING ITEM QTY IN CART (START)
  function addToQty(index, cart) {
    // add one to that cart item's qty
    cart[index].qty = cart[index].qty + 1
    // set the cart (with new item qty)
    // need to create a clone of cart since you cannot modify state directly
    setCart(structuredClone(cart))
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
    console.log('Checking out...')
  }

  return (
    <>
      <h3>Cart</h3>
      <ul>
        {cart.map((item, index) => (
          <li key={item.id}>
            <h4>{item.name}</h4>
            <button onClick={() => subtractFromQty(index, cart)}>-</button>
            <h4>Quantity: {item.qty}</h4>
            <button onClick={() => addToQty(index, cart)}>+</button>

            <h4>Price: ${Number(item.qty * item.price).toFixed(2)}</h4>
            <button onClick={() => removeFromCart(index, cart)}>Remove</button>
          </li>
        ))}
      </ul>
      <h4>Total Price: ${sumOfPrices.toFixed(2)}</h4>
      <button onClick={handleCheckoutButton}>Checkout</button>
    </>
  )
}

export default GuestCart
