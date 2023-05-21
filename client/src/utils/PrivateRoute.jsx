import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  const isAuthenticated = user?.role === "admin";
  console.log("check", isAuthenticated);

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
