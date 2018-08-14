import { $ } from 'app/utils'
import authFactory from 'auth'
import Login from './login'
import PasswordReset from 'screens/password/password-reset'
import React from 'react'
import ReactDOM from 'react-dom'

export default () => {
  const auth = authFactory()
  const target = $('.main')
  if (auth.isLoggedIn) {
    window.location = '/'
  } else if (window.location.hash === '#reset_password') {
    ReactDOM.render(<PasswordReset auth={auth} />, target)
  } else {
    ReactDOM.render(<Login auth={auth} />, target)
  }
}
