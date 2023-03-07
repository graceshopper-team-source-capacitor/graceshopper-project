import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// WORKING
export const fetchCartById = createAsyncThunk('cart/fetchById', async (userId) => {
  try {
    const { data } = await axios.get(`/api/cart/${userId}`)
    console.log('data', data)
    return data
  } catch (err) {
    console.log(err)
  }
})
//pass state into thunk so it passes back the new state

// WORKING
export const deleteWholeCartById = createAsyncThunk('cart/delete', async (userId) => {
  const { data } = await axios.delete(`/api/cart/${userId}`)
  return data
})

// WORKING
export const deleteLineItemById = createAsyncThunk(
  'cart/lineItem/delete',
  async ({ orderId, productId }) => {
    const { data } = await axios.delete(`/api/cart/${orderId}/${productId}`)
    return data
  }
)

// WORKING
export const addOneToLineItemQty = createAsyncThunk(
  'cart/lineItem/addOneToQty',
  async ({ userId, productId, amount }) => {
    const { data } = await axios.put(`/api/cart/addOne/${userId}/${productId}`, {
      productId: productId,
      qty: amount,
    })
    console.log('thunk data', data)
    return data
  }
)

// WORKING
export const subtractOneFromLineItemQty = createAsyncThunk(
  'cart/lineItem/SubtractOneFromQty',
  async ({ userId, productId, amount }) => {
    const { data } = await axios.put(`/api/cart/subtractOne/${userId}/${productId}`, {
      productId: productId,
      qty: amount,
    })
    // console.log('thunk', data)
    return data
  }
)

// WORKING
export const addManyToLineItemQty = createAsyncThunk(
  'cart/lineItem/addManyToQty',
  async ({ userId, productId, amount }) => {
    const { data } = await axios.put(`/api/cart/addMany/${userId}/${productId}`, {
      productId: productId,
      qty: amount,
    })
    return data
  }
)

export const addLineItemForUserCart = createAsyncThunk(
  'cart/lineItem/addLineItemToCart',
  async ({ userId, productId, amount }) => {
    const { data } = await axios.post(`/api/cart/${userId}/${productId}`, {
      productId: productId,
      qty: amount,
    })
    return data
  }
)

export const initialState = {
  numItemsInCart: 0,
  cart: {},
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.numItemsInCart += 1
    },
    incrementByAmount: (state, action) => {
      state.numItemsInCart += action.payload
    },
    decrement: (state) => {
      state.numItemsInCart -= 1
    },
    decrementByAmount: (state, action) => {
      state.numItemsInCart -= action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartById.fulfilled, (state, action) => {
      return action.payload
    }),
      builder.addCase(deleteWholeCartById.fulfilled, (state, action) => {
        return action.payload
      })
    builder.addCase(deleteLineItemById.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(addOneToLineItemQty.fulfilled, (state, action) => {
      console.log('action', action.payload)
      state.cart = action.payload
      // console.log('state of cart', state.cart)
    })
    builder.addCase(subtractOneFromLineItemQty.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(addManyToLineItemQty.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(addLineItemForUserCart.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export const selectCart = (state) => state.cart

// console.log('cart qty', selectCartQty)

export const { increment, incrementByAmount, decrement, decrementByAmount } = cartSlice.actions

export default cartSlice.reducer
