import axios from 'axios';

/**
 * Patrones Singleton y Proxy
 */
const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});
console.log(api);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la petición:', error);
    return Promise.reject(error);
  }
);

export const getProducts = async () => {
  return api.get('/products');
};

export default api;