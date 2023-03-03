import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import authReducer from '../features/auth/authSlice'
import guestCartSlice from '../features/cart/guestCartSlice'
import allProductReducer from '../features/products/allProductsSlice'
import singleProductSlice from '../features/products/singleProductSlice'
import UsersSlice from '../features/users/userListSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const reducer = combineReducers({
  auth: authReducer,
  products: allProductReducer,
  singleProduct: singleProductSlice,
  guestCart: guestCartSlice,
  users: UsersSlice,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store
export * from '../features/auth/authSlice'
