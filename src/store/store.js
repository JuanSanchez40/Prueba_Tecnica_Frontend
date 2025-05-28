import { configureStore } from '@reduxjs/toolkit';
import carritoReducer from './carritoSlice';

export const store = configureStore({
  reducer: {
    carrito: carritoReducer,
  },
});
