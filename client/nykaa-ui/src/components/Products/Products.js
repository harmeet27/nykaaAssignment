import React, { useRef, useCallback } from "react";
import fallback from "../../nykaa_logo.svg";
import "./Products.css";

const handleError = (e) => {
  if (e.target.onerror === null) {
    e.target.src = fallback;
  }
};

const Products = ({ products, hasMore, setPageNumber }) => {
  const observer = useRef();
  const lastProduct = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("Visible");
          setPageNumber();
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [hasMore]
  );

  const renderProduct = (product, key, isLast) => {
    const sizes = product.sizeVariation.map((entry) => entry.title);
    return (
      <div className="item" ref={isLast ? lastProduct : undefined} key={key}>
        <div className="productImg">
          <img
            alt={product.name}
            src={product.imageUrl}
            onError={handleError}
          />
        </div>
        <div className="productDetails">
          <h1 className="productName">{product.title}</h1>
          <h4 className="productDescription">{product.subTitle}</h4>
          <p className="productDescription">{sizes.join(" ")}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="items">
      {products.map((product, index) => {
        if (products.length === index + 1) {
          return renderProduct(product, `product.id${index}`, true);
        }
        return renderProduct(product, `product.id${index}`, false);
      })}
    </div>
  );
};

export default Products;
