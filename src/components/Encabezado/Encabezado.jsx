import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../store/carritoSlice';
import logoLiverpool from '../../assets/images/Liverpool_logo.svg.png';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import './Encabezado.css';

/**
 * Patrón Presentacional (Componente de Presentación)
 */
export const Encabezado = ({ onReset }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // Mostrar HomeIcon solo en /tienda o /productdetail/:id
  const showHomeIcon = location.pathname.startsWith('/tienda') || /^\/productdetail(\/|$)/.test(location.pathname);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 1084 : false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1084);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const cartItems = useSelector(state => state.carrito.items);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    signOut(auth);
    dispatch(clearCart());
    localStorage.removeItem('justLoggedIn'); // Limpia el flag al cerrar sesión
  };

  return (
    <header className="header">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: user ? 'space-between' : 'center',
          gap: user ? '2rem' : 0,
        }}
      >
        <div
          className="container header-content"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: user ? '2rem' : 0,
            width: user ? '100%' : 'auto',
            margin: '0 auto',
            justifyContent: user ? 'space-between' : 'center',
          }}
        >
        <div className="header-logo">
          <img 
            src={logoLiverpool}
            alt="Logo Liverpool"
            className="logo-image"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/tienda')}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: '8rem' }}>
            {!isMobile && showHomeIcon && (
              <HomeIcon
                sx={{ fontSize: 32, cursor: 'pointer', color: '#1976d2' }}
                titleAccess="Ir a Home"
                onClick={() => navigate('/', { state: { fromTienda: true } })}
              />
            )}
            {!isMobile && <h1 className="header-title">e-Commerce</h1>}
          </div>
        </div>
        
        <div className="header-actions">
          {user && !isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginRight: 16 }}>
              <Avatar src={user.photoURL || undefined} alt={user.displayName || user.email} sx={{ width: 32, height: 32 }} />
              <span style={{ fontWeight: 500, fontSize: 15 }}>{user.displayName || user.email}</span>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={handleLogout}
                sx={{ ml: 1 }}
              >
                Cerrar sesión
              </Button>
            </div>
          )}
          {user && (
            <>
              {user && (
                <div className="cart-icon-wrapper" style={{position:'relative',display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <ShoppingCartIcon sx={{ fontSize: 24 }} />
                  {cartItems.length > 0 && (
                    <span className="cart-count">{cartItems.length}</span>
                  )}
                  {typeof window !== 'undefined' && window.innerWidth <= 1084 && cartItems.length > 0 && (
                    <span style={{
                      marginTop: 2,
                      fontSize: 14,
                      color: '#1976d2',
                      fontWeight: 600,
                      background: '#FFC0CB80',
                      borderRadius: 8,
                      padding: '1px 8px',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.07)'
                    }}>
                      ${cartItems.reduce((acc, item) => acc + (item.price * item.cantidad), 0).toFixed(2)}
                    </span>
                  )}
                </div>
              )}
              <Button
                variant="contained"
                color="primary"
                startIcon={<RotateLeftIcon />}
                onClick={onReset}
                size="small"
              >
                Reiniciar
              </Button>
            </>
          )}
        </div>
        </div>
      </div>
    </header>
  );
};