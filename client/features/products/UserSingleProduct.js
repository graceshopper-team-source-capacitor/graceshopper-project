import React, { useEffect, useState } from 'react'
import { fetchSingleProductAsync, selectSingleProduct } from './singleProductSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { incrementByAmount } from '../cart/guestCartSlice'
import {
  addOneToLineItemQty,
  addManyToLineItemQty,
  addLineItemForUserCart,
  subtractOneFromLineItemQty,
  deleteWholeCartById,
  fetchCartById,
  selectCart,
} from '../cart/userCartSlice'

const UserSingleProduct = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const product = useSelector(selectSingleProduct)
  const fetchedCart = useSelector(selectCart)
  const me = useSelector((state) => state.auth.me)
  const navigate = useNavigate()

  const [amount, setAmount] = useState(1)
  const [cart, setCart] = useState([])

  useEffect(() => {
    dispatch(fetchSingleProductAsync(id))
  }, [dispatch])

  const subtractFromAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1)
      console.log('amount', amount)
    }
  }

  const addToAmount = () => {
    setAmount(amount + 1)
    console.log('amount', amount)
  }

  console.log('fetched cart', fetchedCart)
  function lineItemProductIdsArrayFunc() {
    const productIdArr = []
    for (let i = 0; i < fetchedCart.lineItems?.length; i++) {
      productIdArr.push(fetchedCart.lineItems[i].productId)
    }
    return productIdArr
  }

  const lineItemProductIdsArray = lineItemProductIdsArrayFunc()

  const addToCart = (id, amount) => {
    // if there is a line item already, update line item
    if (lineItemProductIdsArray.includes(id)) {
      if (amount === 1) {
        dispatch(addOneToLineItemQty({ userId: me.id, productId: id, amount }))
      } else {
        dispatch(addManyToLineItemQty({ userId: me.id, productId: id, amount }))
      }
    } else {
      //if there's not already a line item, create a line item with the qty
      dispatch(addLineItemForUserCart({ userId: me.id, productId: id, amount }))
    }
    // add amount of items to the total number of items
    // needed to update navbar cart counter
    // dispatch(incrementByAmount(amount))
    // dispatch(fetchCartById(me.id))
  }

  return (
    <div>
      <img src={`/${product.imageUrl}`} />
      <p>{product.name}</p>
      <p>${Number(product.price).toFixed(2)}</p>
      <p>{product.type}</p>
      <p>{product.description}</p>
      <button onClick={subtractFromAmount}>-</button>
      <p>{amount}</p>
      <button onClick={addToAmount}>+</button>
      <button onClick={() => addToCart(product.id, amount)}>Add to Cart</button>
    </div>
  )
}

export default UserSingleProduct
