import React, { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import { TarjetaProducto } from '../components/TarjetaProducto/TarjetaProducto';
import { Encabezado } from '../components/Encabezado/Encabezado';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, clearCart } from '../store/carritoSlice';
import { getProducts } from '../services/api';

function Tienda() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cartItems = useSelector(state => state.carrito.items);
  

  const handleReset = () => {
    setSearchTerm('');
    dispatch(clearCart());
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching products. Please try again later.');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const productosFiltrados = products.filter(producto =>
    producto.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>{error}</div>;

  // Drag and drop: agrega producto al carrito
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && over.id === 'cart-droppable') {
      // Usa el producto directamente del drag si está disponible
      const productoArrastrado = active.data?.current || products.find(
        p => `product-${p.id}` === active.id
      );
      if (productoArrastrado) {
        dispatch(addItem(productoArrastrado));
      }
    }
  };


  return (
    <DndContext onDragEnd={handleDragEnd}>
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
    </DndContext>
  );
}

export default Tienda;
