import React from 'react';
import './Products.css';

const Products = ({ products }) => {
  console.log(products.length);
  return (<div className="items">
    {products.map((product) => {
       return(
       <>
       <div key={product.id} className="item">
       <div className="product-img">
         <img alt={product.name} src={product.imageUrl}/>
       </div>
       <div className="product-details">
         <h1 id="product-name">{product.title}</h1>
         <h4 id="product-description">{product.subTitle}</h4>
       </div>
       </div>
     </>
       );
    })}
      
  </div>
  );
  };

export default Products;