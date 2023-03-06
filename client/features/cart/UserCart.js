import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  addOneToLineItemQty,
  deleteLineItemById,
  fetchCartById,
  selectCart,
  subtractOneFromLineItemQty,
} from './userCartSlice'
import { fetchProductsAsync, selectProducts } from '../products/allProductsSlice'
import { decrement } from './guestCartSlice'

/**
 * COMPONENT
 */
const UserCart = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [amount, setAmount] = useState(1)
  const fetchedCart = useSelector(selectCart)
  const allProducts = useSelector(selectProducts)
  const me = useSelector((state) => state.auth.me)
  // console.log(me)
  // console.log('line items', fetchedCart.lineItems)
  // console.log('allProducts', allProducts)

  useEffect(() => {
    dispatch(fetchCartById(me.id))
  }, [])

  useEffect(() => {
    fetchProductsAsync()
  }, [dispatch])

  useEffect(() => {
    getUserProductWithQtyFunc()
  }, [fetchedCart])

  // FETCHING A USERS CART - (START)
  // creates an array of all the product's in user cart with qtys
  function getUserProductWithQtyFunc() {
    const productIdArr = []
    const productQtyArr = []
    const userProducts = []
    const allUserProductsWithQty = []
    for (let i = 0; i < fetchedCart.lineItems?.length; i++) {
      productIdArr.push(fetchedCart.lineItems[i].productId)
      productQtyArr.push(fetchedCart.lineItems[i].qty)
    }
    for (let i = 0; i < allProducts.length; i++) {
      for (let j = 0; j < productIdArr.length; j++) {
        if (allProducts[i].id === productIdArr[j]) {
          userProducts.push(allProducts[i])
        }
      }
    }
    for (let i = 0; i < userProducts.length; i++) {
      allUserProductsWithQty.push(({ ...userProducts[i], qty: productQtyArr[i] }))
    }
    return allUserProductsWithQty
  }

  const allUserProductsWithQty = getUserProductWithQtyFunc()
  // FETCHING A USERS CART - (END)

  // SUBTRACT FROM QTY (START)
  function subtractFromQty(itemId, itemQty) {
    if (itemQty > 1) {
      dispatch(subtractOneFromLineItemQty({ userId: me.id, productId: itemId, amount }))
      // TODO:
      // updating qty in database but not updating view
      // need to query from database again

      // workaround but is not optimal:
      window.location.reload()

      dispatch(decrement())
    } else {
      // remove whole line item
      dispatch(deleteLineItemById({ orderId: fetchedCart.id, productId: itemId }))
      // TODO:
      // updating qty in database but not updating view
      // need to query from database again

      // workaround but is not optimal:
      window.location.reload()
      dispatch(increment())
    }
  }
  // SUBTRACT FROM QTY (END)

  // ADD TO QTY (START)
  function addToQty(itemId) {
    dispatch(addOneToLineItemQty({ userId: me.id, productId: itemId, amount }))
    // TODO:
    // updating qty in database but not updating view
    // need to query from database again

    // workaround but is not optimal:
    window.location.reload()
  }
  // ADD TO QTY (END)

  // REMOVE FROM CART (START)
  function removeFromCart(itemId) {
    // remove whole line item
    dispatch(deleteLineItemById({ orderId: fetchedCart.id, productId: itemId }))
    // TODO:
    // updating qty in database but not updating view
    // need to query from database again

    // workaround but is not optimal:
    window.location.reload()
  }
  // REMOVE FROM CART (START)

  // TOTAL CART PRICE (START)
  // creates an array of all prices in local cart
  const cartPriceArray = []
  for (let i = 0; i < allUserProductsWithQty.length; i++) {
    cartPriceArray.push(allUserProductsWithQty[i].price * allUserProductsWithQty[i].qty)
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

  console.log('fetched cart', fetchedCart)
  console.log('all user products with qty', allUserProductsWithQty)

  return (
    <>
      <h3>Cart</h3>
      <ul>
        {allUserProductsWithQty.map((item, index) => (
          <li key={item.id}>
            <Link to={`/products/${item.id}`}>{item.name}</Link>
            <div>
              <img src={item.imageUrl} />
            </div>
            <div>
              <button onClick={() => subtractFromQty(item.id, item.qty)}>-</button>
              <h4>Quantity: {item.qty}</h4>
              <button onClick={() => addToQty(item.id)}>+</button>
            </div>
            <h4>Price: ${Number(item.qty * item.price).toFixed(2)}</h4>
            <button onClick={() => removeFromCart(item.id, item.qty)}>Remove</button>
          </li>
        ))}
      </ul>
      <h4>Total Price: ${sumOfPrices.toFixed(2)}</h4>
      <button onClick={handleCheckoutButton}>Checkout</button>
    </>
  )
}

export default UserCart
