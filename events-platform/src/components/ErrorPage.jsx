import React from "react";

const ErrorPage = ({ error }) => {
  return (
    <div className="error-page">
      <p className="error-paragraph">{error ? error : "Not a valid path"}</p>
    </div>
  );
};

export default ErrorPage;