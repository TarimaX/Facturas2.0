import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../App';
import axios from 'axios';

function Cart() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [cartItemsWithCategory, setCartItemsWithCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryPromises = cartItems.map((item) =>
        axios.get(`http://localhost:8800/api/categories/${item.ID_CATEGORIA}`)
      );
      try {
        const categoryResponses = await Promise.all(categoryPromises);
        const cartItemsWithCategory = cartItems.map((item, index) => ({
          ...item,
          category: categoryResponses[index].data,
        }));
        setCartItemsWithCategory(cartItemsWithCategory);
      } catch (error) {
        console.error('Error al obtener información de categorías:', error);
      }
    };

    fetchCategories();
  }, [cartItems]);

  const increaseQuantity = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.PRO_ID === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.PRO_ID === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.PRO_ID !== productId)
    );
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {cartItemsWithCategory.map((item) => (
          <li key={item.PRO_ID}>
            <h3>{item.PRO_NOMBRE}</h3>
            {item.category && (
              <div>
                <p><b>Categoría: </b>{item.category.CATEGORIA}</p>
                <p><b>Descripción: </b>{item.category.DESCRIPCION}</p>
              </div>
            )}
            <p><b>Precio: </b>${item.PRO_PRECIO.toFixed(2)}</p>
            <p><b>Cantidad: </b>{item.quantity}</p>
            <button onClick={() => increaseQuantity(item.PRO_ID)}>+</button>
            <button onClick={() => decreaseQuantity(item.PRO_ID)}>-</button>
            <button onClick={() => removeItem(item.PRO_ID)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
