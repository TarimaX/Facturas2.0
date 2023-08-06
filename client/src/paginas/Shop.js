import React, { useState } from 'react';
import Product from '../Product';
import ShoppingCart from './ShoppingCart';

const initialProducts = [
];

const Shop = () => {
  const [products, setProducts] = useState(initialProducts);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item));
    } else {
      setCartItems([...cartItems, { ...product, cantidad: 1 }]);
    }
  };

  const handleRemoveFromCart = (product) => {
    const updatedCartItems = cartItems.map(item => item.id === product.id ? { ...item, cantidad: item.cantidad - 1 } : item);
    setCartItems(updatedCartItems.filter(item => item.cantidad > 0));
  };

  return (
    <div className="shop">
      <div className="products">
        {products.map(product => (
          <Product key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
      <ShoppingCart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
    </div>
  );
}

export default Shop;
