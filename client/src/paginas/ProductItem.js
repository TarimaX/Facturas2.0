import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../App';
import axios from 'axios';


function ProductItem({ product }) {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [categoryName, setCategoryName] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8800/api/categories/${product.ID_CATEGORIA}`)
      .then((response) => {
        setCategoryName(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la categoría:', error);
      });
  }, [product.ID_CATEGORIA]);

  const addToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.PRO_ID === product.PRO_ID);

    if (existingProduct) {
      const updatedCartItems = cartItems.map((item) =>
        item.PRO_ID === product.PRO_ID ? { ...item, quantity: item.quantity + 1 } : item
      );

      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className='item-p' key={product.PRO_ID}>
      <div className='attribute-s'> <h3>{product.PRO_NOMBRE}</h3> </div>
      {categoryName && (
        <div className='attribute-s-d'>
          <div className='subattribute'>{categoryName.CATEGORIA}</div>
          <div className='subattribute'>{categoryName.DESCRIPCION}</div>
        </div>
      )}
      <div className='attribute.-s'>
      {typeof product.PRO_PRECIO === 'number' ? (
        <p>${product.PRO_PRECIO.toFixed(2)}</p>
      ) : (
        <p>No disponible</p>
      )}
      </div>
      <div className='attribute-s'>
      <button onClick={() => addToCart(product)}>Agregar al carrito</button>
      </div>
    </div>
  );
}

export default ProductItem;
