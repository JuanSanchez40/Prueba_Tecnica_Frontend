import {
  FETCH_FORM_REQUEST,
  FETCH_FORM_SUCCESS,
  FETCH_FORM_FAILURE,
} from './actionTypes';

const initialState = {
  loading: false,
  data: null,
  error: null
};

export default function reducerFormulario(state = initialState, action) {
  switch (action.type) {
    case FETCH_FORM_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_FORM_SUCCESS:
      return { ...state, loading: false, data: action.payload, formValues: {}, formErrors: {} };
    case FETCH_FORM_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
