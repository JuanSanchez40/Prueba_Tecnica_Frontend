import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem, clearCart } from '../store/carritoSlice';
import { getProducts } from '../services/api';
import './ProductDetail.css';
import { Encabezado } from '../components/Encabezado/Encabezado';

function ProductDetail() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleReset = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProducts();
        const found = response.data.find(p => String(p.id) === String(productId));
        setProduct(found);
        setLoading(false);
      } catch (err) {
        setError('No se pudo cargar el producto.');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

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
