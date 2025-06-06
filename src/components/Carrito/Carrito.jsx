import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from '../../store/carritoSlice';
import './carrito.css';

/**
 * Patrón Presentacional y Observador
 */
export const Carrito = () => {
  const items = useSelector(state => state.carrito.items);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const { setNodeRef } = useDroppable({
    id: 'cart-droppable',
  });

  if (!user) return null;

  const totalUnidades = items.reduce((sum, item) => sum + item.cantidad, 0);
  const cartClass = items.length === 0 ? 'cart cart--empty' : 'cart';

  return (
    <div ref={setNodeRef} className={cartClass}>
      <div className="cart-header">
        <div className="cart-title">
          <ShoppingCartIcon sx={{ fontSize: 20 }} />
          <span>Carrito de Compras</span>
        </div>
        <span className="cart-badge">
          {totalUnidades} {totalUnidades === 1 ? 'unidad' : 'unidades'}
        </span>
      </div>
      
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.image}
              alt={item.title}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <p className="cart-item-title">{item.title}</p>
              <p className="cart-item-price">${item.price.toFixed(2)} <span style={{fontWeight:600, color:'#1976d2'}}>x{item.cantidad}</span></p>
            </div>
            <IconButton
              onClick={() => dispatch(removeItem(item.id))}
              size="small"
              className="remove-button"
              aria-label="Eliminar producto"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        ))}
      </div>
      
      {items.length > 0 && (
        <div className="cart-total">
          Total: ${items.reduce((sum, item) => sum + item.price * item.cantidad, 0).toFixed(2)}
        </div>
      )}
    </div>
  );
};