import React, { useState, useEffect } from "react";
import "./global.css";
import Navbar from "./Navbar";

const UserNoti = () => {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://e-com-backend-w8yy.onrender.com/api/user")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error("Error fetching Users:", error));
  }, []);

  const updateUserStatus = (UserId, status) => {
    fetch(`https://e-com-backend-w8yy.onrender.com/api/user/${UserId}`, {
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
      <div className="usernoti-main-container">
      {Users.length === 0 ? (
          <div className="usernoti-no-users">
            <h2>No pending requests</h2>
            <button className="usernoti-back-btn" onClick={handleBackToHome}>Back to Home Page</button>
          </div>
        ) : (
        Users.map(User => (
          <div key={User._id} className="usernoti-box">
            <h2 className="usernoti-title">Name : {User.name}</h2>
            <p className="usernoti-desc">Username : {User.username}</p>
            <p className="usernoti-desc">Email : {User.email}</p>
            <p className="usernoti-desc">Phone Number : {User.phonenumber}</p>
            <button className="usernoti-approve-btn" onClick={() => updateUserStatus(User._id, 'active')}>Approve</button>
            <button className="usernoti-reject-btn" onClick={() => updateUserStatus(User._id, 'inactive')}>Reject</button>
          </div>
        )))}
      </div>
    </>
  );
};

export default UserNoti;