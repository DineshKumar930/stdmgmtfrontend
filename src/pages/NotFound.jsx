import "./NotFound.css";
import React from "react";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <FaExclamationTriangle className="not-found-icon" />
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-message">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="not-found-button">
          <FaHome className="button-icon" />
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;