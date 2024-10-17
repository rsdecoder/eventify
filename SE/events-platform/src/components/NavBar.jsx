import React from "react";
import { Link } from "react-router-dom";


const NavBar = () => {
  return (
    <div id="header">
      <div className="header-welcome">
        <img
          src="./src/assets/logo.png"
          className="logo"
          style={{ height: "50px", width: "50px", borderRadius: "50%" }}
        />
        <p className="style-app-name">Eventify</p>
      </div>
      <ul className="user-nav">
        <Link to="/login" className="user-nav-link">
          <li>Create Event</li>
        </Link>
        <Link to="/tickets" className="user-nav-link">
          <li>Tickets</li>
        </Link>
        <Link to="/account" className="user-nav-link">
          <li>Account</li>
        </Link>
      </ul>
    </div>
  );
};

export default NavBar;
