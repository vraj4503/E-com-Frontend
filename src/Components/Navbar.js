import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./global.css";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const role = user ? user.role : "guest"; 

  const handleNotificationProductClick = () => {
    navigate("/notificationProduct");
  };

  const handleNotificationUserClick = () => {
    navigate("/notificationUser");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      <div
        className="navbar-profile-btn"
        onClick={() => setDropdownOpen((open) => !open)}
        ref={dropdownRef}
        tabIndex={0}
      >
        P
        <div className={`navbar-profile-dropdown${dropdownOpen ? " show" : ""}`}>
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