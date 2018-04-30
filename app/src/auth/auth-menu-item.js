import IconLogin from 'icons/icon-login'
import PropTypes from 'prop-types'
import React from 'react'
import { compose, getContext, withHandlers } from 'recompose'

const AuthMenuItem = ({ openAuthModal }) => (
  <a onClick={openAuthModal}>
    <IconLogin />
  </a>
)

export default compose(
  getContext({
    openAuthModal: PropTypes.func,
  }),
  withHandlers({
    openAuthModal: ({ openAuthModal }) => () => openAuthModal(),
  })
)(AuthMenuItem)
