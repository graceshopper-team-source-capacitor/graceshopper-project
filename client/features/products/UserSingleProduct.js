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
} from '../cart/cartSlice'
// import { me } from '../auth/authSlice'

const UserSingleProduct = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const product = useSelector(selectSingleProduct)
  const fetchedCart = useSelector(selectCart)
  const me = useSelector((state) => state.auth.me)
  const navigate = useNavigate()

  const [amount, setAmount] = useState(1)
  const [cart, setCart] = useState([])

  useEffect(() => {}, [])

  // console.log(me.id)
  // console.log('id', id)
  // console.log('product id', product.id)
  // console.log('fetchedCart', fetchedCart)

  // on first render, gets the cart saved in local storage
  // local storage persist on refresh
  useEffect(() => {
    // try {
    //   // USER CART READS AND WRITES FROM/TO LOCAL STORAGE
    //   // IF LOGGED IN, SET LS CART TO DB CART
    //   // IF NOT LOGGED IN CONTINUE BELOW
    //   let localCart = localStorage.getItem('cart') || ''
    //   // convert cart into json because local storage can only read strings & primative types
    //   let jsonCart = JSON.parse(localCart)
    //   if (localCart) setCart(jsonCart)
    // } catch (err) {}
  }, [])

  // when cart updates set cart local storage
  // useEffect(() => {
  //   localStorage.setItem('cart', JSON.stringify(cart))
  // }, [cart])

  useEffect(() => {
    // dispatch(addManyToLineItemQty({ userId: me.id, productId: id, amount }))
    // dispatch(addLineItemForUserCart({ userId: me.id, productId: id, amount }))
  }, [amount])

  useEffect(() => {
    dispatch(fetchSingleProductAsync(id))

    // dispatch(fetchCartById(me.id))
    // dispatch(deleteWholeCartById(me.id))
    // dispatch(addOneToLineItemQty({ userId: me.id, productId: id, amount }))
    // dispatch(subtractOneFromLineItemQty({ userId: me.id, productId: id, amount }))
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

  const addToCart = (id, amount) => {
    dispatch(addLineItemForUserCart({ userId: me.id, productId: id, amount }))
    dispatch(addManyToLineItemQty({ userId: me.id, productId: id, amount }))
    navigate('/cart')

    console.log('amount', amount)

    //   }
    // }
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