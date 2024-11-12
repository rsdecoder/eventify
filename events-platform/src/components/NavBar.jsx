import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../context/AuthContext";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
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
        <a href="/">
          <p className="style-app-name">Eventify</p>
        </a>
      </div>
      <ul className="user-nav">
        <a href="/" className="user-nav-link">
          <li>Events</li>
        </a>

        {userDetails && userDetails.role === "staff" ? (
          <a href="/add-event" className="user-nav-link">
            <li>Create Event</li>
          </a>
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
                  <a href="/login" className="user-link">
                    <li>SignUp/Login</li>
                  </a>
                ) : null}
                {currentUser ? (
                  <a href="/profile" className="user-link">
                    <li>Profile</li>
                  </a>
                ) : null}
                {currentUser ? (
                  <a href="/logout" className="user-link">
                    <li>Sign out</li>
                  </a>
                ) : null}
              </ul>
            </div>
          )}
        </li>
      </ul>
      <div id="sidebar-nav">
        <ViewHeadlineIcon
          onClick={toggleDropdown}
          style={{ fotSize: "large" }}
          className="sidebar-icon"
        ></ViewHeadlineIcon>
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
                <a href="/login">
                  <li>SignUp/Login</li>
                </a>
              ) : null}
              {userDetails && userDetails.role === "staff" ? (
                <a href="/add-event" className="user-link">
                  <li>Create Event</li>
                </a>
              ) : null}
              {currentUser ? (
                <a href="/profile" className="user-link">
                  <li>Profile</li>
                </a>
              ) : null}
              {currentUser ? (
                <a href="/logout" className="user-link">
                  <li>Sign out</li>
                </a>
              ) : null}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
