import React from "react";
import { useNavigate } from "react-router-dom";
import "./global.css";
const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const role = user ? user.role : "guest"; 

  const handleNotificationProductClick = () => {
    navigate("/notificationProduct");
  };

  const handleNotificationUserClick = () => {
    navigate("/notificationUser");
  };

  return (
    <nav className="navbar-main">
      {role === "admin" || role === "superadmin" ? (
        <button className="navbar-product-btn" onClick={handleNotificationProductClick}>
          Notification Product
        </button>
      ) : null}
      {role === "superadmin" ? (
        <button className="navbar-user-btn" onClick={handleNotificationUserClick}>
          Notification User
        </button>
      ) : null}                                                                              
      <div className="navbar-profile-btn"> P
        <div className="navbar-profile-dropdown">
            <a href="#">Login ID: {user ? user._id : ""} </a>
            <a href="#">Login Name: {user ? user.username : ""} </a>
            <a href="#">Email: {user ? user.email : ""} </a>
            <a href="#">Role: {user ? user.role : ""} </a>
            <a href="/login">Log Out</a>
        </div>
    </div>
    </nav>
  );
};

export default Navbar;