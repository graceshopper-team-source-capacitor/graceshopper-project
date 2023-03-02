import React, { useEffect, useState } from 'react'
import { fetchSingleProductAsync, selectSingleProduct } from './singleProductSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'

const Product = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const product = useSelector(selectSingleProduct)

  const [amount, setAmount] = useState(1)
  const [cart, setCart] = useState([])

  useEffect(() => {
    try {
      let localCart = localStorage.getItem('cart') || ''
      let jsonCart = JSON.parse(localCart)
      if (localCart) setCart(jsonCart)
    } catch (err) {}
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    dispatch(fetchSingleProductAsync(id))
  }, [dispatch])

  const subtractFromAmount = () => {
    setAmount(amount - 1)
  }

  const addToAmount = () => {
    setAmount(amount + 1)
  }

  const addToCart = () => {
    const itemAlreadyInCart = cart.find((cartItem) => cartItem.id === product.id)
    const itemAlreadyInCartIndex = cart.findIndex((cartItem) => cartItem.id === product.id)

    const addedItem = { ...product, qty: amount }
    if (cart.length === 0) {
      setCart([addedItem])
    } else if (cart.length > 0) {
      if (itemAlreadyInCart === undefined) {
        const newCart = [...cart, addedItem]
        setCart(newCart)
      } else {
        cart[itemAlreadyInCartIndex].qty = itemAlreadyInCart.qty + amount
        setCart([...cart])
      }
    }
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
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  )
}

export default Product
