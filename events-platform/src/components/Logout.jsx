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

  return (
    <div className="logout-container">
      <h2 className="logout-item">Are you sure you want to log out?</h2>
      <div className="button-section">
        <button
          onClick={handleLogout}
          className="logout-section-button logout-item logout-button"
        >
          Logout
        </button>
        <Link to="/">
          <button className="logout-item logout-section-button cancel-button">
            Cancel
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Logout;
