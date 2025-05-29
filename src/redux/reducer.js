// reducer.js
import { combineReducers } from 'redux';
import reducerProductos from './actions/actionProductos/reducerProductos';
import carrito from '../store/carritoSlice';

const rootReducer = combineReducers({
  productos: reducerProductos,
  carrito,
  // Agrega aquí otros reducers si los necesitas
});

export default rootReducer;
