import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { auth, db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [isEyeClicked, setIsEyeClicked] = useState(true);
  const [type, setType] = useState("password");
  const [quote, setQuote] = useState("Show Password");
  const { eventId, ticketsToBuy } = location.state || {};

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
      }
    });
    return unsubscribe;
  }, []);

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
        const user = userCred.user;
        getDoc(doc(db, "users", user.uid)).then((userDoc) => {
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.role === "staff") {
              alert("You are successfully logged in as staff!");
              navigate("/add-event");
            } else {
              alert("You are successfully logged in!");
              if (eventId && ticketsToBuy) {
                navigate(`/events/${eventId}`, {state: { 
                  ticketsChosen: ticketsToBuy,
                }});
              } else {
                navigate("/");
              }
            }
          } else {
            navigate("/");
          }
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div id="login">
      <div className="login-section">
        <p className="signup-info">Don't have an account? </p>
        <Link to="/sign-up" className="signup-link">
          <button className="signup-button">Sign Up</button>
        </Link>
        <form id="login-form" onSubmit={handleLoginSubmit}>
          <p className="signup-info">
            If you already have an account with us, please log in by filling
            your details below
          </p>
          <label className="form-label">
            <span className="required-attribute">*</span>Enter your Email
            address:{" "}
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
          <input type="submit" value="Log in" className="submit" />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
