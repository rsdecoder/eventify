// src/components/SignUp.js
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";
const env = process.env;
const eventbriteOrganizationId = env.REACT_APP_EVENTBRITE_ORGANIZATION_ID;

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userTypedOrganizationId, setUserTypedOrganizationId] = useState("");
  const [role, setRole] = useState("user");
  const [err, setErr] = useState(null);
  const [isTrue, setIsTrue] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (
      userTypedOrganizationId &&
      userTypedOrganizationId === eventbriteOrganizationId &&
      role === "staff"
    ) {
      setIsTrue(false);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          addToDatabase(user);
          alert("You have signed up succesfully!");
          navigate("/login");
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(`Error during sign-up: ${errorMessage}`);
        });
    } else if (role === "user") {
      setIsTrue(false);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          addToDatabase(user);
          alert("You have signed up succesfully!");
          navigate("/login");
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(`Error during sign-up: ${errorMessage}`);
        });
    } else {
      setIsTrue(true);
    }
  };

  const addToDatabase = (user) => {
    const data = {
      username: username,
      email: email,
      role: role,
    };
    setDoc(doc(db, "users", user.uid), data)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        setErr(error);
      });
  };

  if (err) {
    return <ErrorPage error={err.message} />;
  }
  return (
    <div id="login">
      <div className="login-section">
        <p className="signup-info">
          Please sign up by filling the details below
        </p>
        <form id="login-form" onSubmit={handleSignUp}>
          <label className="form-label">
            <span className="required-attribute">*</span>Enter username{" "}
            <input
              className="form-input"
              type="text"
              name="username"
              placeholder="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className="form-label">
            <span className="required-attribute">*</span>Enter an email address{" "}
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="form-label">
            <span className="required-attribute">*</span>password{" "}
            <input
              className="form-input"
              type="password"
              name="password"
              placeholder="Password"
              minLength="8"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <p className="signup-info">
            Are you a staff trying to login? If yes, please select staff
            otherwise select user.
          </p>
          <div className="radio-input-section">
            <label className="form-label">
              <input
                type="radio"
                value="user"
                name="role"
                className="radio-input"
                checked={role === "user"}
                onChange={(e) => setRole(e.target.value)}
              />{" "}
              user
            </label>
            <label className="form-label">
              <input
                type="radio"
                value="staff"
                name="role"
                className="radio-input"
                checked={role === "staff"}
                onChange={(e) => setRole(e.target.value)}
              />{" "}
              staff
            </label>
          </div>
          {role === "staff" ? (
            <>
              <label className="form-label">
                <span className="required-attribute">*</span>Please enter your
                organization Id
                <input
                  type="string"
                  name="organizationId"
                  placeholder="(required only for staff)"
                  className="form-input"
                  required
                  autoComplete="off"
                  onChange={(e) => setUserTypedOrganizationId(e.target.value)}
                />
              </label>
              <p className={isTrue ? "err-msg" : "hide-msg"}>
                Please re-type/check your organization id
              </p>
            </>
          ) : null}
          <input type="submit" value="Sign Up" className="submit" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
