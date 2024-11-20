import React from "react";
import { Navigate } from "react-router-dom";

const AuthLayout = ({ children, isPublic }) => {
  const token = localStorage.getItem("token");

  if (!token && !isPublic) {
    return <Navigate to="/sign-in" replace />;
  }

  if (token && isPublic) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AuthLayout;
