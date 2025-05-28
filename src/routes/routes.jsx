import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Tienda from '../pages/Tienda';
import ProductDetail from '../pages/ProductDetail';
import { constRoutes } from './constRoutes';

const AppRoutes = () => (
  <Routes>
    <Route path={constRoutes.HOME} element={<Home />} />
    <Route path={constRoutes.TIENDA} element={<Tienda />} />
    <Route path={constRoutes.PRODUCT_DETAIL} element={<ProductDetail />} />
  </Routes>
);

export default AppRoutes;
