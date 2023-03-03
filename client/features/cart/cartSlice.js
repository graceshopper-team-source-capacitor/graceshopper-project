import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//accepts userId as param
export const getCartThunk = createAsyncThunk('cart/getCartThunk', async (id) => {
  try {
    const { data } = await axios.get(`api/order/${id}/cart`)
    return data
  } catch (error) {
    next(error)
  }
})

// HERE
// adding a line item to the cart
export const addLineItemAsync = createAsyncThunk('cart/addLineItem', async ({ id, qty }) => {
  const { data } = await axios.post('api/getUserCart/:userId/:productId', {
    id: id,
    qty: qty,
  })
  console.log('post', data)
  return data
})

//add to specific user cart
export const addToCart = createAsyncThunk('cart/addToCart', async ({ userId, productId }) => {
  try {
    const { data } = await axios.put(`/api/order/${userId}/cart/${productId}`)
    return data
  } catch (error) {
    console.log(error)
    next(error)
  }
})

//remove from single user  cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ userId, productId }) => {
    try {
      const { data } = await axios.put(`/api/order/${userId}/cart/${productId}/removeone`)
      return data
    } catch (error) {
      next(error)
    }
  }
)

//edit Cart logic needs to have /api/getUserCart/lineItem/${lineItemId} in its axios.put
//async({lineItemId, qty})
export const editCart = createAsyncThunk('cart/editCart', async ({ lineItemId, qty }) => {
  try {
    const { data } = await axios.put(`/api/getUserCart/lineItem/${lineItemId}`, qty)
    return data
  } catch (error) {
    next(error)
  }
})

const initialState = []

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCartThunk.fulfilled, (state, action) => {
      // Add cart to the state array
      return action.payload
    })
    builder.addCase(addToCart.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(addLineItemAsync.fulfilled, (state, action) => {
      console.log('action', action.payload)
      state.cart.push(action.payload)
    })
    builder.addCase(addLineItemAsync.rejected, (state, action) => {
      console.log('action', action.payload)
      // state.cart.push(action.payload)
    })
  },
})

export const confirmationPage = createAsyncThunk(
  'confirmation order',
  async ({ token, cart, user }) => {
    try {
      const { data } = await axios.post('/api/checkout/checkout-session', cart, {
        headers: { authorization: token },
      })
      data && (window.location = data.url)
    } catch (error) {
      console.log(error)
    }
  }
)

export const selectCart = (state) => state.cart

export default cartSlice.reducer
