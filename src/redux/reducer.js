// reducer.js
import { combineReducers } from 'redux';
import reducerProductos from './actions/actionProductos/reducerProductos';
import carrito from '../store/carritoSlice';

import authReducer from './authSlice';

const rootReducer = combineReducers({
  productos: reducerProductos,
  carrito,
  auth: authReducer,
  // Agrega aquí otros reducers si los necesitas
});

export default rootReducer;
