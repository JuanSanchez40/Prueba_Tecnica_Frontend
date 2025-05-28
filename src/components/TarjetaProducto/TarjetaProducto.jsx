import React from 'react';

import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/carritoSlice';
import { useNavigate } from 'react-router-dom';

/**
 * Patrón Presentacional Componente de Presentación
 */
export const TarjetaProducto = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleImageClick = () => {
    navigate(`/${product.id}`);
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
        <Typography variant="h6" color="primary">
          ${product.price.toFixed(2)}
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