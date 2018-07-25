import { $ } from 'app/utils'
import authFactory from 'auth'
import Login from './login'
import React from 'react'
import ReactDOM from 'react-dom'

export default () => {
  const auth = authFactory()
  if (auth.isLoggedIn) {
    window.location = '/'
  } else {
    const target = $('.main')
    ReactDOM.render(<Login auth={auth} />, target)
  }
}
