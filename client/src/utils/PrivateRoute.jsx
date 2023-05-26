import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPopup } from "../state/user";
import Popup from "../componets/Popup";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  const isAuthenticated = user?.role === "admin";

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
