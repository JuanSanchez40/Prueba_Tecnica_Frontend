import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, clearCart } from '../store/carritoSlice';

import './ProductDetail.css';
import { Encabezado } from '../components/Encabezado/Encabezado';

function ProductDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
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
            <div className="product-detail-price">Precio: <b>${product.price}</b></div>
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
