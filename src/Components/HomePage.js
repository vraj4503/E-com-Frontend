import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ProductList from "./ProductList";
import AddProductButton from "./AddProductButton";
import "./HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = sessionStorage.getItem("role");
    setRole(userRole);

    fetch("http://localhost:3500/api/products")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <div>
      <Navbar role={role} />
      <div className="centered-container">
        <h1>Products</h1>
        <ProductList products={products} />
        <AddProductButton />
      </div>
    </div>
  );
};

export default HomePage;