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

const cartSlice = createSlice({
  name: 'cart',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartById.fulfilled, (state, action) => {
      console.log('action payload', action.payload)
      return action.payload
    })
  },
})

export const selectCart = (state) => state.cart

export default cartSlice.reducer
