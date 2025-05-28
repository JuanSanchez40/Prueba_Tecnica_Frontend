import { productos } from '../data/productos';
import { api } from './api';

/**
 * Patrones Servicio y Fábrica
 */
export const ProductosService = {
  obtenerProductos: () => api,
  
  buscarProductos: (termino) => {
    const terminoLower = termino.toLowerCase();
    return api.filter(producto => 
      producto.title.toLowerCase().includes(terminoLower)
    );
  }
};
console.log(ProductosService);
// Para pruebas del listado de productos cambiar la variable api por "productos" importada 
// para traerse los datos en duro de los productos
