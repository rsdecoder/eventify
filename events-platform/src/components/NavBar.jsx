import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { userDetails, currentUser } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div id="header">
      <div className="header-welcome">
        <a href="/">
          <img
            src="../assets/logo.png"
            className="logo"
            style={{ height: "50px", width: "50px", borderRadius: "50%" }}
            alt="app-logo"
          />
        </a>
        <p className="style-app-name">Eventify</p>
      </div>
      <ul className="user-nav">
        <li>
          <a href="/" className="user-nav-link">
            Events
          </a>
        </li>
        {userDetails && userDetails.role === "staff" ? (
          <li>
            <a href="/add-event" className="user-nav-link">
              Create Event
            </a>
          </li>
        ) : null}
        <li className="navbar-item">
          <button
            onClick={toggleDropdown}
            className="user-nav-link account-button"
          >
            Account
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-close">
                <p className="dropdown-header">Eventify</p>
                <CloseIcon
                  onClick={toggleDropdown}
                  cursor="pointer"
                  className="close-icon"
                />
              </div>
              <ul className="dropdown-list">
                {!currentUser ? (
                  <li>
                    <a href="/login">SignUp/Login</a>
                  </li>
                ) : null}
                {currentUser ? (
                  <li>
                    <a href="/profile">Profile</a>
                  </li>
                ) : null}
                {currentUser ? (
                  <li>
                    <a href="/logout">Sign out</a>
                  </li>
                ) : null}
              </ul>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
