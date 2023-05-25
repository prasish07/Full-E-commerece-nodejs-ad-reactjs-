import React from "react";
import { Link } from "react-router-dom";
import "./error.css";

const Error = () => {
  return (
    <div className="page">
      <div>
        <h1>404</h1>
        <h4>page not found</h4>
        <Link to="/" className="btn">
          Back Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
