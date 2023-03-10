import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProductsAsync = createAsyncThunk('products', async (category) => {
  const { data } = await axios.get(`/api/products?type=${category.type}`)
  // console.log(category)
  return data
})

export const addProductAsync = createAsyncThunk(
  'products/new',
  async ({ name, imageUrl, price, type, description }) => {
    const { data } = await axios.post('/api/products', {
      name,
      imageUrl,
      price,
      type,
      description,
    })
    return data
  }
)

export const deleteProductAsync = createAsyncThunk('products/deleteProduct', async (id) => {
  const { data } = await axios.delete(`/api/products/${id}`)
  return data
})

export const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      return action.payload
    })
    builder.addCase(addProductAsync.fulfilled, (state, action) => {
      state.push(action.payload)
    })
    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      const newState = state.filter((product) => product.id !== action.payload.id)
      return newState
    })
  },
})

export const selectProducts = (state) => state.products

export default productsSlice.reducer
