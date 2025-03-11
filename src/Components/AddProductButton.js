import React from "react";
import { useNavigate } from "react-router-dom";

const AddProductButton = () => {
  const navigate = useNavigate();

  const handleAddProductClick = () => {
    navigate("/addProduct");
  };

  return (
    <button type="button" className="btn btn-primary" onClick={handleAddProductClick}>
      Add Product
    </button>
  );
};

export default AddProductButton;