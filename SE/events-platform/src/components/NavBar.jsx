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
      <div className="user-nav">
        <Link to ="/tickets" className="no-decoration">Tickets</Link>
        <Link to ="/login" href="" className="no-decoration">Login</Link>
      </div>
    </div>
  );
};

export default NavBar;
