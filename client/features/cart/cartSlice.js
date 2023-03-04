import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCartById = createAsyncThunk('cart/fetchById', async (userId) => {
  try {
    const { data } = await axios.get(`/api/cart/${userId}`)
    console.log('data', data)
    return data
  } catch (err) {
    console.log(err)
  }
})

export const deleteWholeCartById = createAsyncThunk('cart/delete', async (userId) => {
  const { data } = await axios.delete(`/api/cart/${userId}`)
  return data
})

// IN PROGRESS
export const addOneToLineItemQty = createAsyncThunk(
  'cart/lineItem/addOneToQty',
  async ({ userId, productId, amount }) => {
    const { data } = await axios.put(`/api/cart/addOne/${userId}/${productId}`, {
      id: productId,
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
      console.log('action payload', action.payload)
      return action.payload
    }),
      builder.addCase(deleteWholeCartById.fulfilled, (state, action) => {
        return action.payload
      })
    builder.addCase(addOneToLineItemQty.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export const selectCart = (state) => state.cart

export default cartSlice.reducer
