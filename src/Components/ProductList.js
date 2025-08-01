import React, { useState } from "react";
import './global.css';

const ProductList = ({ products }) => {
  const sortedProducts = products.sort((a, b) => a._id - b._id);

  return (
    <div className="shop-list-container">
      {sortedProducts.map(product => (
        <ShopProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

const ShopProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageError = () => {
    if (currentImageIndex < product.image.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <div className="shop-product-card">
      <div className="shop-product-image-wrap">
        {product.image && product.image.length > 0 && (
          <img
            src={`https://e-com-backend-w8yy.onrender.com/uploads/${product.image[currentImageIndex]}`}
            alt={product.name}
            className="shop-product-image"
            onError={handleImageError}
          />
        )}
      </div>
      <div className="shop-product-details">
        <h3 className="shop-product-title">{product.name}</h3>
        <p className="shop-product-desc">{product.description}</p>
        <div className="shop-product-price-row">
          <span className="shop-product-price">₹{product.price}</span>
          <button className="shop-product-buy-btn">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;