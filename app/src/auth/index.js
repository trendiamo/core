import { $ } from 'utils'
import AuthMenuItem from './auth-menu-item'
import AuthModalProvider from './auth-modal-provider'
import React from 'react'
import ReactDOM from 'react-dom'

export default () => {
  const target = document.createElement('div')
  target.classList.add('site-header__account')
  $('.site-header__icons-wrapper').prepend(target)

  ReactDOM.render(
    <AuthModalProvider appElement={target}>
      <AuthMenuItem />
    </AuthModalProvider>,
    target
  )
}
