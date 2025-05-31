import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Tienda from './pages/Tienda';
import ProductDetail from './pages/ProductDetail';
import Formulario from './pages/Formulario';
import { Encabezado } from './components/Encabezado/Encabezado';
import { Carrito } from './components/Carrito/Carrito';
import SlideMenu from './components/SlideMenu';
import { useLocation } from 'react-router-dom';

/**
 * Patrón Contenedor/Presentacional
 */

function PrivateRoute({ children }) {
  const user = useSelector(state => state.auth.user);
  if (!user) return <Navigate to="/home" replace />;
  return children;
}

function App() {
  const location = useLocation();
  const user = useSelector(state => state.auth.user);
  const hideCart = location.pathname === '/' || location.pathname === '/home' || location.pathname === '/formulario';
  const showSlideMenu = user && (
    location.pathname === '/' ||
    location.pathname === '/home' ||
    location.pathname === '/tienda' ||
    location.pathname === '/formulario' ||
    location.pathname.startsWith('/producto/')
  );
  return (
    <>
      <Encabezado />
      {showSlideMenu && <SlideMenu />}
      {!hideCart && <Carrito />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tienda" element={
          <PrivateRoute>
            <Tienda />
          </PrivateRoute>
        } />
        <Route path="/producto/:id" element={
          <PrivateRoute>
            <ProductDetail />
          </PrivateRoute>
        } />
      </Routes>
    </>
  );
}

export default App;