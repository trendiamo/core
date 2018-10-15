import PasswordReset from "../screens/password-reset";
import React from "react";
import RequestPasswordReset from "../screens/password-reset/request-password-reset";
import { Route } from "react-router-dom";

export default [
  <Route
    component={RequestPasswordReset}
    exact
    key="passwordReset"
    noLayout
    path="/request_password_reset"
  />,
  <Route
    component={PasswordReset}
    exact
    key="passwordReset"
    noLayout
    path="/password_reset"
  />
];
