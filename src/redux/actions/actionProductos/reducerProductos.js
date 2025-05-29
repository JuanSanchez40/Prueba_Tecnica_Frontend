// reducerProductos.js
import { PRODUCTOS_REQUEST, PRODUCTOS_SUCCESS, PRODUCTOS_FAILURE } from './actionTypes';

const initialState = {
  loading: false,
  productos: [],
  error: null,
  page: 1,
  hasMore: true,
};

export default function reducerProductos(state = initialState, action) {
  switch (action.type) {
    case PRODUCTOS_REQUEST:
      return { ...state, loading: true };
    case PRODUCTOS_SUCCESS:
      return {
        ...state,
        loading: false,
        productos: action.payload.page === 1 ? action.payload.productos : [...state.productos, ...action.payload.productos],
        page: action.payload.page,
        hasMore: action.payload.hasMore,
        error: null,
      };
    case PRODUCTOS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
