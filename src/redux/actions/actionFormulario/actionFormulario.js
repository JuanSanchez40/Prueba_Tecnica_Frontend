import axios from 'axios';
import {
  FETCH_FORM_REQUEST,
  FETCH_FORM_SUCCESS,
  FETCH_FORM_FAILURE
} from './actionTypes';

const ENDPOINT = 'https://run.mocky.io/v3/77448f36-66a1-4e53-9efe-5ad426f8a0e0';

export const fetchForm = () => async (dispatch) => {
  dispatch({ type: FETCH_FORM_REQUEST });
  try {
    const response = await axios.get(ENDPOINT);
    dispatch({ type: FETCH_FORM_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_FORM_FAILURE, payload: error.message });
  }
};

