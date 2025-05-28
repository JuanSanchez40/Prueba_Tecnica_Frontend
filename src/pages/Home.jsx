import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Bienvenido a la Tienda</h1>
      <p>Descubre los mejores productos al mejor precio.</p>
      <Link to="/tienda" className="home-link">Ir a la tienda</Link>
    </div>
  );
}

export default Home;
