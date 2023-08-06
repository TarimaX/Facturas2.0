import React, { useContext } from 'react';
import ProductItem from './ProductItem';
import { CartContext } from '../App';


function ProductList({ products }) {
  const { setCartItems } = useContext(CartContext);

  const addToCart = (product) => {
    setCartItems((prevCartItems) => [...prevCartItems, product]);
  };

  return (
    <div>
      <h1>Lista de Productos</h1>
      <div className='shop-product'>
        <div className='product-names-shop'>
          <div className="name-s">PRODUCTO</div>
          <div className="name-s">CATEGORIA</div>
          <div className='name-s'>DESCRIPCIÓN</div>
          <div className="name-s">PRECIO</div>
          <div className="name-s">ACCIONES  </div>
        </div>

        {products.map((product) => (
          <ProductItem key={product.PRO_ID} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
