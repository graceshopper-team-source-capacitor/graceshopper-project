import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import singleProductSlice from '../features/products/singleProductSlice';

const store = configureStore({
  reducer: { auth: authReducer, singleProduct: singleProductSlice },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
