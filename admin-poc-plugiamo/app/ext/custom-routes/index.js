import PasswordReset from '../../password-reset'
import React from 'react'
import RequestPasswordReset from '../../password-reset/request-password-reset.js'
import { Route } from 'react-router-dom'

export default [
  <Route component={RequestPasswordReset} key="passwordReset" exact path="/request_password_reset" />,
  <Route component={PasswordReset} key="passwordReset" exact path="/password_reset" />,
]
