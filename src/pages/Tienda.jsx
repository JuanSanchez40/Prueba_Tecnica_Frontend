import React, { useState, useEffect } from 'react';
import { TarjetaProducto } from '../components/TarjetaProducto/TarjetaProducto';
import { Encabezado } from '../components/Encabezado/Encabezado';
import Toast from '../components/Toast';

import { useSelector, useDispatch } from 'react-redux';
import { addItem, clearCart } from '../store/carritoSlice';
import { fetchProductos } from '../redux/actions/actionProductos/actionProductos';

function Tienda() {
  const [toastOpen, setToastOpen] = useState(false);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const { productos, loading, error, page = 1, hasMore = true } = useSelector(state => state.productos);
  const cartItems = useSelector(state => state.carrito.items);

  const handleReset = () => {
    setSearchTerm('');
    dispatch(clearCart());
  };

  useEffect(() => {
    dispatch(fetchProductos('', 1));
    // eslint-disable-next-line
  }, [dispatch]);

  // Mostrar toast si acaba de iniciar sesión
  useEffect(() => {
    if (localStorage.getItem('justLoggedIn')) {
      setToastOpen(true);
      localStorage.removeItem('justLoggedIn');
    }
  }, []);

  // Infinite scroll handler
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
            !loading && hasMore
          ) {
            dispatch(fetchProductos('', page + 1));
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch, loading, hasMore, page]);


  const productosFiltrados = productos.filter(producto => {
    const nombre = producto.name?.toLowerCase() ?? '';
    const titulo = producto.title?.toLowerCase() ?? '';
    const termino = searchTerm.toLowerCase();
    return nombre.includes(termino) || titulo.includes(termino);
  });

  // Solo muestra el loader si no hay productos (carga inicial)
  if (loading && productos.length === 0) return <div>Cargando productos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Encabezado onReset={handleReset} />
      <Toast open={toastOpen} message="Has iniciado sesión correctamente!" onClose={() => setToastOpen(false)} />
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
