import React, { useState } from "react";
import './global.css';

const ProductList = ({ products }) => {
  const sortedProducts = products.sort((a, b) => a._id - b._id);

  return (
    <div className="productlist-main-container">
      {sortedProducts.map(product => (
        <ProductlistCard key={product._id} product={product} />
      ))}
    </div>
  );
};

const ProductlistCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageError = () => {
    if (currentImageIndex < product.image.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <div className="productlist-card">
      <div className="productlist-image-wrap">
        {product.image && product.image.length > 0 && (
          <img
            src={`https://e-com-backend-w8yy.onrender.com/uploads/${product.image[currentImageIndex]}`}
            alt={product.name}
            className="productlist-image"
            onError={handleImageError}
          />
        )}
      </div>
      <div className="productlist-details">
        <h3 className="productlist-title">{product.name}</h3>
        <p className="productlist-desc">{product.description}</p>
        <div className="productlist-price-row">
          <span className="productlist-price">₹{product.price}</span>
          <button className="productlist-buy-btn">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;