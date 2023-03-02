import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = []

const guestCartSlice = createSlice({
  name: 'guestCart',
  initialState: {
    numItemsInCart: 0,
  },
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
  },
})

export const selectGuestCart = (state) => state.guestCart

export const { increment, incrementByAmount, decrement } = guestCartSlice.actions

export default guestCartSlice.reducer
