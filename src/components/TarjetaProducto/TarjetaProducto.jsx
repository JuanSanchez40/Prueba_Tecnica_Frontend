import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../../store/carritoSlice';

import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { addItem } from '../../store/carritoSlice';
import { useNavigate } from 'react-router-dom';

/**
 * Patrón Presentacional Componente de Presentación
 */
import { useEffect, useState } from 'react';
export const TarjetaProducto = ({ product }) => {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 1084 : false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1084);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const cantidad = useSelector(state => state.carrito.items.find(i => i.id === product.id)?.cantidad || 0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleImageClick = () => {
    navigate(`/producto/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addItem(product));
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'box-shadow 0.3s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: 'contain', cursor: 'pointer' }}
        onClick={handleImageClick}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h3" sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{
          mb: 2,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary" sx={{display:'flex',alignItems:'center',gap:1}}>
           ${product.price.toFixed(2)}
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
                 marginLeft: 8,
                 fontWeight: 600,
                 cursor: 'pointer',
                 userSelect: 'none'
               }}
               title="Quitar una unidad"
             >
               x{cantidad}
             </span>
           )}
         </Typography>
      </CardContent>
      <div style={{ width: '100%', padding: '0 16px 16px 16px', boxSizing: 'border-box', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={handleAddToCart}
          style={{
            minWidth: 120,
            padding: '10px 24px',
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: 16
          }}
        >
          Agregar
        </button>
      </div>
    </Card>
  );
};