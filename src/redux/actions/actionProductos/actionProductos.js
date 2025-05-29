// actionProductos.js
import axios from 'axios';
import { PRODUCTOS_REQUEST, PRODUCTOS_SUCCESS, PRODUCTOS_FAILURE } from './actionTypes';

export const fetchProductos = (search = '', page = 1) => async (dispatch) => {
  dispatch({ type: PRODUCTOS_REQUEST });
  try {
    // Petición al endpoint real de productos
    const response = await axios.get('https://fakestoreapi.com/products');
    dispatch({
      type: PRODUCTOS_SUCCESS,
      payload: {
        productos: response.data,
        page,
        hasMore: false,
      },
    });
  } catch (error) {
    dispatch({
      type: PRODUCTOS_FAILURE,
      payload: error.message,
    });
  }
};
