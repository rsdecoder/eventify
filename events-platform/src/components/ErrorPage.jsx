import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = ({ error }) => {
  return (
    <div className="error-page">
      <p className="error-paragraph">{error ? error : "Not a valid path"}</p>
      <Link to="/" className="goback-button">
       Go back home
      </Link>
    </div>
  );
};

export default ErrorPage;
