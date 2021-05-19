import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user.currentUser);
  if (user) return <Route {...rest}>{children}</Route>;
  return <Redirect to={"/login"} />;
};

export default PrivateRoute;
