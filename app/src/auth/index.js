import { $ } from 'utils'
import AuthModal from './auth-modal'
import React from 'react'
import ReactDOM from 'react-dom'

export default () => {
  const target = document.createElement('div')
  target.classList.add('site-header__account')
  $('.site-header__icons-wrapper').prepend(target)

  ReactDOM.render(<AuthModal appElement={target} />, target)
}
