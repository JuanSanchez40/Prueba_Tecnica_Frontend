import React, { useState, useEffect } from 'react';
import './SlideMenu.css';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { clearCart } from '../store/carritoSlice';

const SlideMenu = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector(state => state.auth.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 1084 : false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1084);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    signOut(auth);
    dispatch(clearCart());
    localStorage.removeItem('justLoggedIn');
  };

  if (!user) return null;

  return (
    <div className={`slide-menu-container${open ? ' open' : ''}`}>
      <button className="slide-tab" onClick={() => setOpen(!open)}>
        &#9776;
      </button>
      <div className={`slide-content${open ? ' show' : ''}`}>
        {isMobile && (
          <Link to="/" className="slide-link" style={{marginBottom:8}}>
            HOME
          </Link>
        )}
        <Link to="/formulario" className="slide-link">FORMULARIO</Link>
        {isMobile && (
          <button className="slide-link" style={{marginTop:8,background:'none',border:'none',color:'#d32f2f',cursor:'pointer',fontWeight:600}} onClick={handleLogout}>
            CERRAR SESIÓN
          </button>
        )}
      </div>
    </div>
  );
};

export default SlideMenu;
