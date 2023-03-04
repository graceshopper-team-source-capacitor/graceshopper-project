import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addOneToLineItemQty, fetchCartById, selectCart } from '../cart/cartSlice'
import { fetchProductsAsync, selectProducts } from '../products/allProductsSlice'

/**
 * COMPONENT
 */
const UserCart = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [amount, setAmount] = useState(1)
  const fetchedCart = useSelector(selectCart)
  const allProducts = useSelector(selectProducts)
  const me = useSelector((state) => state.auth.me)
  // console.log(me)
  // console.log('line items', fetchedCart.lineItems)
  // console.log('allProducts', allProducts)
  console.log('cart', fetchedCart)

  useEffect(() => {
    dispatch(fetchCartById(me.id))
  }, [])

  useEffect(() => {
    fetchProductsAsync()
  }, [dispatch])

  // FETCHING A USERS CART - (START)
  // creates an array of all the product ids in the user cart line items
  function getUserProductWithQtyFunc() {
    const productIdArr = []
    const producQtyArr = []
    const userProducts = []
    const allUserProductsWithQty = []
    for (let i = 0; i < fetchedCart.lineItems?.length; i++) {
      productIdArr.push(fetchedCart.lineItems[i].productId)
      producQtyArr.push(fetchedCart.lineItems[i].qty)
    }
    for (let i = 0; i < allProducts.length; i++) {
      for (let j = 0; j < productIdArr.length; j++) {
        if (allProducts[i].id === productIdArr[j]) {
          userProducts.push(allProducts[i])
        }
      }
    }
    for (let i = 0; i < userProducts.length; i++) {
      allUserProductsWithQty.push((userProducts[i] = { ...userProducts[i], qty: producQtyArr[i] }))
    }
    return allUserProductsWithQty
  }

  const allUserProductsWithQty = getUserProductWithQtyFunc()
  // FETCHING A USERS CART - (END)

  // ADD TO QTY (START)
  function addToQty(itemId) {
    console.log('add')
    dispatch(addOneToLineItemQty({ userId: me.id, productId: itemId, amount }))
    //updating qty in databse but not updating view
  }
  // ADD TO QTY (END)

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
        {allUserProductsWithQty.map((item, index) => (
          <li key={item.id}>
            <h4>{item.name}</h4>
            <img src={item.imageUrl} />
            <div>
              <button onClick={() => subtractFromQty(index, cart)}>-</button>
              <h4>Quantity: {item.qty}</h4>
              <button onClick={() => addToQty(item.id)}>+</button>
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
