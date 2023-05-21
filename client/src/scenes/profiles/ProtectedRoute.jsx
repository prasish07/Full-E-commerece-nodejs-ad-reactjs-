import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.auth.user);

  return user ? (
    <Route {...rest} element={children} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
