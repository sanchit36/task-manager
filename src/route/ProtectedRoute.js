import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user.currentUser);
  if (!user) return <Route {...rest}>{children}</Route>;
  return <Redirect to={"/"} />;
};

export default ProtectedRoute;
