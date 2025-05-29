import React, { useState, useEffect } from 'react';
import { TarjetaProducto } from '../components/TarjetaProducto/TarjetaProducto';
import { Encabezado } from '../components/Encabezado/Encabezado';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, clearCart } from '../store/carritoSlice';
import { fetchProductos } from '../redux/actions/actionProductos/actionProductos';

function Tienda() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const { productos, loading, error } = useSelector(state => state.productos);
  const cartItems = useSelector(state => state.carrito.items);

  const handleReset = () => {
    setSearchTerm('');
    dispatch(clearCart());
  };

  useEffect(() => {
    if (!productos || productos.length === 0) {
      dispatch(fetchProductos());
    }
  }, [dispatch, productos]);

  const productosFiltrados = productos.filter(producto => {
    const nombre = producto.name?.toLowerCase() ?? '';
    const titulo = producto.title?.toLowerCase() ?? '';
    const termino = searchTerm.toLowerCase();
    return nombre.includes(termino) || titulo.includes(termino);
  });

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Encabezado onReset={handleReset} />
      <main className="main-content">
        <div className="search-container">
          <div className="search-wrapper">
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar productos..."
              className="search-input"
            />
          </div>
        </div>
        <div className="products-grid">
          {productosFiltrados.map(producto => (
            <TarjetaProducto key={producto.id} product={producto} />
          ))}
        </div>
      </main>
    </>
  );
}

export default Tienda;
