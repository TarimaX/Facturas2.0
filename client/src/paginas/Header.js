import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { CartContext } from '../App';
import Logo from '../paginas/Images/logo.png';

function Header() {
  const { cartItems } = useContext(CartContext);

  return (
    <header>
      <div className='navbar'>
        <Link to="/" >
          <div >
          </div>
        </Link>
        <Link to="/" className="navbar-logo">
          <div className='logo-container'>
          <img src={Logo} alt='Logo' ></img>
          </div>
        </Link>
        <Link to="/products">Tienda</Link>
        <Link to="/inventario">
          Ver Inventario
        </Link>
        <Link to="/facturas">
          Ver Facturas
        </Link>
        {/* Luego cambiar por algo mas bonito */}
        <p>Productos en el carrito: {cartItems.length}</p>
        <Link to="/cart">
          <button className='btn-see-cart'>Ver Carrito</button>
        </Link>
        <Link to="/register">
          <button className='btn-register'>Registrarse</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
