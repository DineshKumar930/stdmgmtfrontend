import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

  return isAdminLoggedIn ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;