import React from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import "./logout.css";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("Successfully logged out!");
        navigate("/login"); // Redirect to login page
      })
      .catch((error) => {
        alert(`Logout failed: ${error.message}`);
      });
  };

  const handleCancelButton = () => {
    navigate("/")
  }

  return (
    <div id="logout-page">
      <h2 className="logout-item">Are you sure you want to log out?</h2>
      <div className="button-section">
        <button
          onClick={handleLogout}
          className="logout-section-button logout-item logout-button"
        >
          Logout
        </button>
        <button 
        onClick= {handleCancelButton}
        className="logout-item logout-section-button cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Logout;
