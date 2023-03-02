import React, { useState, useEffect } from 'react'

// TODO:
// add to cart qty,
// subtract from cart qty,
// remove item from cart

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

  function subractFromQty() {
    console.log('subtracting...')
  }

  function addToQty() {
    console.log('adding...')
  }

  // REMOVING ITEM FROM CART (START)
  const removeFromCart = (index, cart) => {
    // return the index of the item you want to remove
    function indexOfItemClicked() {
      for (let i = 0; i < cart.length; i++) {
        if (cart[index]) {
          return index
        }
      }
    }

    // save that index
    let indexOfCartItem = indexOfItemClicked()
    // delete that one index from the cart
    let splicedCart = cart.splice(indexOfCartItem, 1)
    //set the cart to the new array (not including the removed item)
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
            <button onClick={subractFromQty}>-</button>
            <h4>Quantity: {item.qty}</h4>
            <button onClick={addToQty}>+</button>

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
