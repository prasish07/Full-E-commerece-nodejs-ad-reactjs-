import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  const isAuthenticated = user;

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
