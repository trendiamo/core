import { $ } from 'app/utils'
import authFactory from 'auth'
import AuthMenuItem from './auth-menu-item'
import React from 'react'
import ReactDOM from 'react-dom'

export default () => {
  const auth = authFactory()

  ReactDOM.render(<AuthMenuItem auth={auth} />, $('.secondary-nav__item:first-child'))
  ReactDOM.render(<AuthMenuItem auth={auth} mobile />, $('.mobile-nav__item:last-child'))
}
