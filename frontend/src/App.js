import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Business from './pages/Business/Business';
import WhatDoWeDo from './pages/WhatDoWeDo/WhatDoWeDo';
import Products from './pages/furniture/Products/Products';
import Product from './pages/furniture/Product/Product';
import ProductsType from './pages/furniture/ProductsType/ProductsType';
import ProductsCategory from './pages/furniture/ProductsCategory/ProductsCategory';
import ProductsMaterial from './pages/furniture/ProductsMaterial/ProductsMaterial';
import ProductsSale from './pages/furniture/ProductsSale/ProductsSale';
import Shops from './pages/Shops/Shops';
import Contact from './pages/Contact/Contact';
import CustomerSupport from './pages/CustomerSupport/CustomerSupport';
import DeliveryCosts from './pages/DeliveryCosts/DeliveryCosts';
import NotFound from './pages/NotFound/NotFound';
import WhatsApp from './components/Whatsapp/Whatsapp';
import ScrollToTopBtn from './components/ScrollToTopBtn/ScrollToTopBtn';
import Footer from './components/Footer/Footer';

import Login from './pages/Login/Login';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import ProductManager from './pages/managers/ProductManager/ProductManager';
import MaterialManager from './pages/managers/MaterialManager/MaterialManager';
import CategoryManager from './pages/managers/CategoryManager/CategoryManager';
import TypeManager from './pages/managers/TypeManager/TypeManager';

import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='inicio' element={<Home />} />
        <Route path='empresa' element={<Business />} />
        <Route path='que-hacemos' element={<WhatDoWeDo />} />
        <Route path='muebles' element={<Products />} />
        <Route path='mueble/:id' element={<Product />} />
        <Route path='muebles/tipo/:type' element={<ProductsType />} />
        <Route path='muebles/categoria/:category' element={<ProductsCategory />} />
        <Route path='muebles/material/:material' element={<ProductsMaterial />} />
        <Route path='muebles/sale' element={<ProductsSale />} />
        <Route path='locales' element={<Shops />} />
        <Route path='contacto' element={<Contact />} />
        <Route path='atencion-al-cliente' element={<CustomerSupport />} />
        <Route path='tiempos-y-costos-de-entrega' element={<DeliveryCosts />} />

        <Route path='login' element={<Login />} />

        <Route element={<ProtectedRoute/>}>
          <Route path='panel-de-administrador' element={<AdminPanel />} />
          <Route path='administrar-muebles' element={<ProductManager />} />
          <Route path='administrar-materiales' element={<MaterialManager />} />
          <Route path='administrar-categorias' element={<CategoryManager />} />
          <Route path='administrar-tipos-de-mueble' element={<TypeManager />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
      <WhatsApp />
      <ScrollToTopBtn />
    </BrowserRouter>
  );
}

export default App;
