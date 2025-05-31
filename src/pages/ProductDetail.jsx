import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, clearCart, removeItem } from '../store/carritoSlice';

import './ProductDetail.css';
import { Encabezado } from '../components/Encabezado/Encabezado';

function ProductDetail() {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 1084 : false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1084);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const dispatch = useDispatch();
  const { id } = useParams();
  const cantidad = useSelector(state => state.carrito.items.find(i => String(i.id) === String(id))?.cantidad || 0);
  const productos = useSelector(state => state.productos.productos);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleReset = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    if (productos.length > 0) {
      const found = productos.find(p => String(p.id) === String(id));
      setProduct(found);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [productos, id]);

  if (loading) return <div>Cargando...</div>;
  if (error || !product) return <div>{error || 'Producto no encontrado.'}</div>;

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  const handleBack = () => {
    navigate(-1); // Regresa a la página anterior
  };

  return (
    <>
      <Encabezado onReset={handleReset} />
      <div className="product-detail-container">
        <div className="product-detail-card">
          <img src={product.image} alt={product.title} className="product-detail-image" />
          <div className="product-detail-info">
            <h2 className="product-detail-title">{product.title}</h2>
            <p className="product-detail-description">{product.description}</p>
            <div className="product-detail-price" style={{display:'flex',alignItems:'center',gap:8}}>
              Precio: <b>${product.price}</b>
              {isMobile && cantidad > 0 && (
                <span
                  onClick={e => {
                    e.stopPropagation();
                    dispatch(removeItem(product.id));
                  }}
                  style={{
                    background: '#1976d2',
                    color: '#fff',
                    borderRadius: '50%',
                    padding: '2px 8px',
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                  title="Quitar una unidad"
                >
                  x{cantidad}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button className="btn-back" onClick={handleBack}>Regresar</button>
              <button className="btn-add-cart" onClick={handleAddToCart}>Agregar al carrito</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
