import React, { useEffect, useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { auth, db } from "../firebase";
const env = process.env;
const eventbriteOrganizationId = env.REACT_APP_EVENTBRITE_ORGANIZATION_ID;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const navigate = useNavigate();

  const [isEyeClicked, setIsEyeClicked] = useState(true);
  const [type, setType] = useState("password");
  const [quote, setQuote] = useState("Show Password");

  // useEffect(() => {

  //   return unsubscribe;
  // }, []);

  const handleToggle = () => {
    setIsEyeClicked((currClickedState) => {
      return !currClickedState;
    });
    if (type === "password" && isEyeClicked === true) {
      setType("text");
      setQuote("Hide Password");
    } else {
      setType("password");
      setQuote("Show Password");
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        console.log("loggedIn!");
        if (organizationId === eventbriteOrganizationId) {
          navigate("/add-event");
        } else {
          navigate("/");
        }
        const user = userCred.user;
        console.log(userCred, "<<<user credentials");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div id="login-section">
      <form id="login-form">
        <label className="form-label">
          <span className="required-attribute">*</span>Enter your Email address:{" "}
          <input
            type="text"
            placeholder="xxxx@gmail.com"
            name="email"
            autoComplete="on"
            className="form-input"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="form-label">
          <span className="required-attribute">*</span>Enter your Password:{" "}
          <input
            type={type}
            name="password"
            placeholder="Password"
            value={password}
            className="form-input"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <p className="toggle-section">
            {quote}
            <span className="togglePassword">
              {!isEyeClicked ? (
                <VisibilityOffIcon
                  onClick={handleToggle}
                  cursor="pointer"
                  className="eyeOff"
                />
              ) : (
                <VisibilityIcon
                  onClick={handleToggle}
                  cursor="pointer"
                  className="eye"
                />
              )}
            </span>
          </p>
        </label>
        <label className="form-label">
          Employee ID number:{" "}
          <input
            type="string"
            name="organizationId"
            placeholder="(only for employees)"
            className="form-input optional"
            autoComplete="off"
            onChange={(e) => setOrganizationId(e.target.value)}
          />
          <p className="info">
            (If you are one of our employees trying to log in, please enter your
            organization ID)
          </p>
        </label>
        <input
          type="submit"
          value="Log in"
          className="submit"
          onClick={handleLoginSubmit}
        />
      </form>
      
    </div>
  );
};

export default LoginForm;
