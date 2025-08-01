import React, { useState } from "react";
import './ProductList.css';

const ProductList = ({ products }) => {
  const sortedProducts = products.sort((a, b) => a._id - b._id);

  return (
    <div className="product-container-list">
      {sortedProducts.map(product => (
        <ProductBox key={product._id} product={product} />
      ))}
    </div>
  );
};

const ProductBox = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageError = () => {
    if (currentImageIndex < product.image.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <div className="product-box">
      <div className="product-image-container-show">
        {product.image && product.image.length > 0 && (
          <img
            src={`https://e-com-backend-w8yy.onrender.com/uploads/${product.image[currentImageIndex]}`}
            alt={product.name}
            className="product-image"
            onError={handleImageError}
          />
        )}
      </div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ₹{product.price}</p>
    </div>
  );
};

export default ProductList;