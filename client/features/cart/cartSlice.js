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

// WORKING
export const deleteWholeCartById = createAsyncThunk('cart/delete', async (userId) => {
  const { data } = await axios.delete(`/api/cart/${userId}`)
  return data
})

// WORKING
export const addOneToLineItemQty = createAsyncThunk(
  'cart/lineItem/addOneToQty',
  async ({ userId, productId, amount }) => {
    const { data } = await axios.put(`/api/cart/addOne/${userId}/${productId}`, {
      productId: productId,
      qty: amount,
    })
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
    console.log('thunk', data)
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

//IN PROGRESS
// adding line item for user cart

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

const cartSlice = createSlice({
  name: 'cart',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartById.fulfilled, (state, action) => {
      return action.payload
    }),
      builder.addCase(deleteWholeCartById.fulfilled, (state, action) => {
        return action.payload
      })
    builder.addCase(addOneToLineItemQty.fulfilled, (state, action) => {
      return action.payload
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

export default cartSlice.reducer
