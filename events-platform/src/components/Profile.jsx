import React, { useState, useEffect } from "react";

import { useAuth } from "../context/AuthContext";
import "./profile.css";

const Profile = () => {
  const [userEmail, setUserEmail] = useState("");
  const [username, setUserName] = useState("");
  const [registeredEvents, userRegisteredDEvents] = useState([]);
  const { currentUser, userDetails } = useAuth();
  useEffect(() => {}, []);

  return (
    <div className="profile-page">
      <h2>Your Profile</h2>
      <div className="profile-details">
        <p className="profile-name profile-item">
          Name: <span className="profile-email">{userDetails.username}</span>
        </p>
        <p className="profile-item">
          Your email address -{" "}
          <span className="profile-email">{userDetails.email}</span>
        </p>
      </div>
    </div>
  );
};

export default Profile;
