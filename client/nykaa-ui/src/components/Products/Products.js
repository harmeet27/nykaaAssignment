import React, { useRef, useCallback } from 'react';
import './Products.css';

const Products = ({ products, hasMore, setPageNumber, getProductList }) => {
  const observer = useRef();
  const lastProduct = useCallback((node) => {
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting && hasMore){
        console.log('Visible');
        setPageNumber();
      }
    })
    if(node){
      observer.current.observe(node);
    }
    console.log(node);
  }, [ hasMore ]);


  return (<div className="items">{products.map((product, index) => {
       if(products.length === index + 1){
         return (
          <div className="item" ref={lastProduct} key={`product.id${index}`}>
          <div className="product-img">
            <img alt={product.name} src={product.imageUrl}/>
          </div>
          <div className="product-details">
            <h1 id="product-name">{product.title}</h1>
            <h4 id="product-description">{product.subTitle}</h4>
          </div>
          </div>
         )
       }
       return(
       <div className="item" key={`product.id${index}`}>
       <div className="product-img">
         <img alt={product.name} src={product.imageUrl}/>
       </div>
       <div className="product-details">
         <h1 id="product-name">{product.title}</h1>
         <h4 id="product-description">{product.subTitle}</h4>
       </div>
       </div>
       );
    })}
     </div>)
  };

export default Products;