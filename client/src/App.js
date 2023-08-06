import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";
import Productos from './productos';
import Facturas from './facturas';
import RegistroSesion from "./paginas/RegistroSesion";
import Login from "./paginas/Login";
import Cliente from "./paginas/ClienteRegistro";
import Proveedor from "./paginas/ProveedorRegistro";
import ProductList from './paginas/ProductList';
import Cart from './paginas/Cart';
import Home from './paginas/Home';
import Header from './paginas/Header';
import axios from 'axios';

export const CartContext = React.createContext();

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8800/api/products')
      .then((response) => {
        const productsWithNumbers = response.data.map((product) => ({
          ...product,
          PRO_PRECIO: parseFloat(product.PRO_PRECIO),
        }));
        setProducts(productsWithNumbers);
      })
      .catch((error) => {
        console.error('Error al obtener los productos:', error);
      });
  }, []);

  return (
    <div className="App">
      <CartContext.Provider value={{ cartItems, setCartItems }}>
        <Router>
          <div>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList products={products} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/register" element={<RegistroSesion />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cliente" element={<Cliente />} />
              <Route path="/proveedor" element={<Proveedor />} />
              <Route path="/inventario" element={<Productos />} />
              <Route path="/facturas" element={<Facturas />} />
            </Routes>
          </div>
        </Router>
      </CartContext.Provider>
    </div>
  );
}

export default App;
