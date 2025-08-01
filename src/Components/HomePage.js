import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ProductList from "./ProductList";
import AddProductButton from "./AddProductButton";
import "./global.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = sessionStorage.getItem("role");
    setRole(userRole);

    fetch("https://e-com-backend-w8yy.onrender.com/api/products")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="home-main-bg">
      <Navbar role={role} />
      <div className="home-center-container">
        <h1 className="home-title">Products</h1>
        <ProductList products={products} />
        <AddProductButton />
      </div>
    </div>
  );
};

export default HomePage;
