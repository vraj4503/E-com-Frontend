import React, { useEffect, useState } from "react";
import "./global.css";
import Navbar from "./Navbar";

const ProductNoti = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://e-com-backend-w8yy.onrender.com/api/product")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  const updateProductStatus = (productId, status) => {
    fetch(`https://e-com-backend-w8yy.onrender.com/api/product/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    })
    .then(response => response.json())
    .then(updatedProduct => {
      setProducts(products.map(product => 
        product._id === productId ? updatedProduct : product
      ));
      alert(`Product status updated to ${status}`);
      window.location.reload();
    })
    .catch(error => console.error(`Error updating product status to ${status}:`, error));
  };

  const handleBackToHome = () => {
    window.location.href = '/home';
  };

  return (
    <>
      <Navbar/>
      <div className="productnoti-main-container">
        {products.length === 0 ? (
          <div className="productnoti-no-products">
            <h2>No pending requests</h2>
            <button className="productnoti-back-btn" onClick={handleBackToHome}>Back to Home Page</button>
          </div>
        ) : (
          products.map(product => (
            <div key={product._id} className="productnoti-box">
               <div className="productnoti-image-container">
                {product.image && (
                  <img 
                    src={`https://e-com-backend-w8yy.onrender.com/uploads/${product.image}`} 
                    alt={product.name} 
                    className="productnoti-image" 
                  />
                )}
                </div>
              <h2 className="productnoti-title">{product.name}</h2>
              <p className="productnoti-desc">{product.description}</p>
              <p className="productnoti-price">Price: ₹{product.price}</p>
              <button className="productnoti-approve-btn" onClick={() => updateProductStatus(product._id, 'active')}>Approve</button>
              <button className="productnoti-reject-btn" onClick={() => updateProductStatus(product._id, 'inactive')}>Reject</button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ProductNoti;