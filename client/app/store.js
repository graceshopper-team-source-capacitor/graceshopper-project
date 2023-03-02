import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import authReducer from '../features/auth/authSlice'
import guestCartSlice from '../features/cart/guestCartSlice'
import allProductReducer from '../features/products/allProductsSlice'
import singleProductSlice from '../features/products/singleProductSlice'
import UsersSlice from '../features/users/userListSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: allProductReducer,
    singleProduct: singleProductSlice,
    guestCart: guestCartSlice,
    users: UsersSlice
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store
export * from '../features/auth/authSlice'
