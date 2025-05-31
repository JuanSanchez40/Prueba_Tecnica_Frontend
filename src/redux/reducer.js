// reducer.js
import { combineReducers } from 'redux';
import reducerProductos from './actions/actionProductos/reducerProductos';
import carrito from '../store/carritoSlice';

import authReducer from './authSlice';

import reducerFormulario from './actions/actionFormulario/reducerFormulario';

const rootReducer = combineReducers({
  productos: reducerProductos,
  carrito,
  auth: authReducer,
  reducerFormulario, // <-- Agregado para el formulario dinámico
  // Agrega aquí otros reducers si los necesitas
});

export default rootReducer;
