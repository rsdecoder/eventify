// src/components/SignUp.js
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user"); // default role

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user to Firestore with role
      await setDoc(doc(db, "users", user.uid), {
        email,
        name,
        role,
      });

      // Optionally, redirect or show success message
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label>
        <input
          type="radio"
          value="user"
          checked={role === "user"}
          onChange={(e) => setRole(e.target.value)}
        />
        User
      </label>
      <label>
        <input
          type="radio"
          value="staff"
          checked={role === "staff"}
          onChange={(e) => setRole(e.target.value)}
        />
        Staff
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
