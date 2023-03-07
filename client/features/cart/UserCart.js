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
// import { decrement } from './guestCartSlice'

const UserCart = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const [amount, setAmount] = useState(1)
  const fetchedCart = useSelector(selectCart)
  const me = useSelector((state) => state.auth.me)
 
  useEffect(() => {
    dispatch(fetchCartById(me.id))
  }, [dispatch])

  // useEffect(() => {
  //   fetchProductsAsync()
  // }, [dispatch])
// useEffect(()=>{
//   dispatch(fetchCartById(me.id))
// }, [dispatch])

// useEffect(()=>{
//   setAmount
// })
 
  // SUBTRACT FROM QTY (START)
  async function subtractFromQty(itemId, itemQty) {
    console.log(itemQty)
    const newQty = itemQty-1
    // const newAmount = amount-1;
    if (itemQty >= 1) {
      await dispatch(subtractOneFromLineItemQty({ userId: me.id, productId: itemId, amount: newQty }))
      //  setAmount(newAmount)
       await dispatch(fetchCartById(me.id))
      // TODO:
      // updating qty in database but not updating view
      // need to query from database again

      // workaround but is not optimal:
      // window.location.reload()

      // dispatch(decrement())
      
    } else {
      // remove whole line item
      await dispatch(deleteLineItemById({ orderId: fetchedCart.id, productId: itemId }))
      //  setAmount(newAmount)
       await dispatch(fetchCartById(me.id))
      // TODO:
      // updating qty in database but not updating view
      // need to query from database again

      // workaround but is not optimal:
      // window.location.reload()
      // dispatch(increment())
   
    }
  }
  // SUBTRACT FROM QTY (END)


  // ADD TO QTY (START)
  async function addToQty(itemId, itemQty) {
    // const otherNewAmount = amount+1
    await dispatch(addOneToLineItemQty({ userId: me.id, productId: itemId }))
    // setAmount(otherNewAmount)
    await dispatch(fetchCartById(me.id))
    // TODO:
    // updating qty in database but not updating view
    // need to query from database again

    // workaround but is not optimal:
    // window.location.reload()
  }
  // ADD TO QTY (END)

  // REMOVE FROM CART (START)
  async function removeFromCart(itemId) {
    // remove whole line item
    await dispatch(deleteLineItemById({ orderId: fetchedCart.id, productId: itemId }))
    await dispatch(fetchCartById(me.id))
    // TODO:
    // updating qty in database but not updating view
    // need to query from database again

    // workaround but is not optimal:
    // window.location.reload()
  }
  // REMOVE FROM CART (START)

  // TOTAL CART PRICE (START)
  // creates an array of all prices in local cart
  const cartPriceArray = []
  for (let i = 0; i < fetchedCart.lineItems?.length; i++) {
    cartPriceArray.push(fetchedCart.lineItems[i]?.product.price * fetchedCart.lineItems[i]?.qty)
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
        {fetchedCart.lineItems?.map((item, index) => {
          const { product, qty } = item
          const { id, name, imageUrl, price } = item.product || {}

          return (
            <li key={id}>
              <Link to={`/products/${id}`}>{name}</Link>
              <div>
                <img src={imageUrl} />
              </div>
              <div>
                <button onClick={() => subtractFromQty(id, qty)}>-</button>
                <h4>Quantity: {qty}</h4>
                <button onClick={() => addToQty(id, qty)}>+</button>
              </div>
              <h4>Price: ${Number(qty * price).toFixed(2)}</h4>
              <button onClick={() => removeFromCart(id, qty)}>Remove</button>
            </li>
          )
        })}
      </ul>
      <h4>Total Price: ${sumOfPrices.toFixed(2)}</h4>
      <button onClick={handleCheckoutButton}>Checkout</button>
    </>
  )
}

export default UserCart