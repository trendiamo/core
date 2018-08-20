import { $ } from 'app/utils'
import authFactory from 'auth'
import React from 'react'
import ReactDOM from 'react-dom'
import Register from './register'

export default () => {
  const auth = authFactory()
  if (auth.isLoggedIn) {
    window.location = '/'
  } else {
    $('#login-system-select').addEventListener('change', event => {
      if (event.target.value === 'brand') {
        ReactDOM.render(<Register auth={auth} />, $('.main'))
      }
    })
  }
}
