import React from 'react';
import { Encabezado } from './components/Encabezado/Encabezado';
import { Carrito } from './components/Carrito/Carrito';
import AppRoutes from './routes/routes';

/**
 * Patrón Contenedor/Presentacional
 */


function App() {
  return (
    <>
      <Encabezado />
      <Carrito />
      <AppRoutes />
    </>
  );
}

export default App;