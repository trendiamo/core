import { apiSignOut } from '../auth/utils'
import ExitIcon from '@material-ui/icons/PowerSettingsNew'
import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'
import { compose, withHandlers } from 'recompose'

const CustomLogoutButton = ({ onLogoutButtonClick }) => (
  <MenuItem onClick={onLogoutButtonClick}>
    <ExitIcon /> {'Logout'}
  </MenuItem>
)

export default compose(
  withHandlers({
    onLogoutButtonClick: () => async event => {
      event.preventDefault()
      await apiSignOut()
      window.location.href = '#/login'
    },
  })
)(CustomLogoutButton)
