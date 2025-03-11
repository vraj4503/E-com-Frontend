import React, { useState, useEffect } from "react";
import "./UserNoti.css";
import Navbar from "./Navbar";


const UserNoti = () => {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3500/api/user")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error("Error fetching Users:", error));
  }, []);

  const updateUserStatus = (UserId, status) => {
    fetch(`http://localhost:3500/api/user/${UserId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    })
    .then(response => response.json())
    .then(updatedUser => {
      setUsers(Users.map(User => 
        User._id === UserId ? updatedUser : User
      ));
      alert(`User status updated to ${status}`);
      window.location.reload();
    })
    .catch(error => console.error(`Error updating User status to ${status}:`, error));
  };

    const handleBackToHome = () => {
      window.location.href = '/home';
    };




  return (
    <>
    <Navbar/>
      <div className="product-container">
      {Users.length === 0 ? (
          <div className="no-products">
            <h2>No pending requests</h2>
            <button className="back-btn btn-secondary" onClick={handleBackToHome}>Back to Home Page</button>
          </div>
        ) : (
        Users.map(User => (
          <div key={User._id} className="product-box">
            <h2>Name : {User.name}</h2>
            <p>Username : {User.username}</p>
            <p>Email : {User.email}</p>
            <p>Phone Number : {User.phonenumber}</p>
            <button className="noti-btn-rec btn-primary" onClick={() => updateUserStatus(User._id, 'active')}>Approve</button>
            <button className="noti-btn-re btn-danger" onClick={() => updateUserStatus(User._id, 'inactive')}>Reject</button>
          </div>
        )))}
      </div>
    </>
  );
};

export default UserNoti;