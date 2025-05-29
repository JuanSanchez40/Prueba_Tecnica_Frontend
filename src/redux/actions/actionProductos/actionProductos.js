// actionProductos.js
import axios from 'axios';
import { PRODUCTOS_REQUEST, PRODUCTOS_SUCCESS, PRODUCTOS_FAILURE } from './actionTypes';

export const fetchProductos = (search = '', page = 1) => async (dispatch) => {
  dispatch({ type: PRODUCTOS_REQUEST });
  try {
    // Petición al endpoint local de json-server con paginación
    const limit = 20;
    const start = (page - 1) * limit;
    const response = await axios.get(`http://localhost:3001/products?_limit=${limit}&_start=${start}`);
    dispatch({
      type: PRODUCTOS_SUCCESS,
      payload: {
        productos: response.data,
        page,
        hasMore: response.data.length === limit,
      },
    });
  } catch (error) {
    dispatch({
      type: PRODUCTOS_FAILURE,
      payload: error.message,
    });
  }
};
