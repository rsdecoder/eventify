import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

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
      <h2>Are you sure you want to log out?</h2>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default Logout;
