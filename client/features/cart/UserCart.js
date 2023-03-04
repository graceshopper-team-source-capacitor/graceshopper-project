import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartById, selectCart } from '../cart/cartSlice'
import { fetchProductsAsync, selectProducts } from '../products/allProductsSlice'

/**
 * COMPONENT
 */
const UserCart = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const fetchedCart = useSelector(selectCart)
  const allProducts = useSelector(selectProducts)
  const me = useSelector((state) => state.auth.me)
  // console.log(me)
  // console.log('line items', fetchedCart.lineItems)
  // console.log('allProducts', allProducts)
  // console.log('cart', fetchedCart)

  // FETCHING A USERS CART - (START)
  // creates an array of all the product ids in the user cart line items
  function getProductIdsForUserArr() {
    let productIdArr = []
    for (let i = 0; i < fetchedCart.lineItems.length; i++) {
      productIdArr.push(fetchedCart.lineItems[i].productId)
    }
    return productIdArr
  }

  const userProductIdsArr = getProductIdsForUserArr()

  // creates an array of the products in a user's cart
  function getUserProducts() {
    const userProducts = []
    for (let i = 0; i < allProducts.length; i++) {
      for (let j = 0; j < userProductIdsArr.length; j++) {
        if (allProducts[i].id === userProductIdsArr[j]) {
          userProducts.push(allProducts[i])
        }
      }
    }
    return userProducts
  }

  const allUserProducts = getUserProducts()
  // FETCHING A USERS CART - (END)

  useEffect(() => {
    dispatch(fetchCartById(me.id))
  }, [])

  useEffect(() => {
    fetchProductsAsync()
  }, [dispatch])

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
    <>
      <h3>Cart</h3>
      <ul>
        {allUserProducts.map((item, index) => (
          <li key={item.id}>
            <h4>{item.name}</h4>
            <img src={item.imageUrl} />
            <div>
              <button onClick={() => subtractFromQty(index, cart)}>-</button>
              <h4>Quantity: {item.qty}</h4>
              <button onClick={() => addToQty(index, cart)}>+</button>
            </div>
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

export default UserCart
