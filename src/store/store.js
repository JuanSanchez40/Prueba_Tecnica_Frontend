import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../redux/reducer';

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
