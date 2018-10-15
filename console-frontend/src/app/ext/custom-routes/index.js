import PasswordReset from '../../password-reset'
import React from 'react'
import RequestPasswordReset from '../../password-reset/request-password-reset.js'
import { Route } from 'react-router-dom'

export default [
  <Route component={RequestPasswordReset} exact key="passwordReset" noLayout path="/request_password_reset" />,
  <Route component={PasswordReset} exact key="passwordReset" noLayout path="/password_reset" />,
]
