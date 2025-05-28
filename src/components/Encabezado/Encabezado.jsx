import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../store/carritoSlice';
import logoLiverpool from '../../assets/images/Liverpool_logo.svg.png';
import './Encabezado.css';

/**
 * Patrón Presentacional (Componente de Presentación)
 */
export const Encabezado = ({ onReset }) => {
  const cartItems = useSelector(state => state.carrito.items);
  const dispatch = useDispatch();

  return (
    <header className="header">
      <div className="container header-content">
        <div className="header-logo">
          <img 
            src={logoLiverpool}
            alt="Logo Liverpool"
            className="logo-image"
          />
          <h1 className="header-title">e-Commerce</h1>
        </div>
        
        <div className="header-actions">
          <div className="cart-icon-wrapper">
            <ShoppingCartIcon sx={{ fontSize: 24 }} />
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </div>
          <Button
            variant="contained"
            color="primary"
            startIcon={<RotateLeftIcon />}
            onClick={onReset}
            size="small"
          >
            Reiniciar
          </Button>
        </div>
      </div>
    </header>
  );
};