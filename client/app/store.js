import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import authReducer from '../features/auth/authSlice'
import guestCartSlice from '../features/cart/guestCartSlice'
import allProductReducer from '../features/products/allProductsSlice'
import singleProductSlice from '../features/products/singleProductSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: allProductReducer,
    singleProduct: singleProductSlice,
    guestCart: guestCartSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store
export * from '../features/auth/authSlice'
