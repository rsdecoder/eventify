import React, { useState, useEffect, useContext } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
useAuth
const Profile = () => {
  const [userEmail, setUserEmail] = useState("");
  const [username, setUserName] = useState("");
  const [registeredEvents, userRegisteredDEvents] = useState([]);
  const {currentUser} = useAuth();
  useEffect(() => {

  }, []);

  return (
    <>
      <p>Your details are here</p>
    </>
  );
};

export default Profile;
