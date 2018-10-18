import AccountCircle from '@material-ui/icons/AccountCircle'
import { apiSignOut } from '../auth/utils'
import auth from 'app/auth'
import ExitIcon from '@material-ui/icons/PowerSettingsNew'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'
import { compose, withHandlers, withProps, withState } from 'recompose'

const CustomUserMenuJSX = ({ onLogoutButtonClick, anchorEl, handleMenu, handleClose, open }) => (
  <React.Fragment>
    <IconButton aria-haspopup="true" aria-owns={open ? 'menu-appbar' : null} color="inherit" onClick={handleMenu}>
      <AccountCircle />
    </IconButton>
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'top',
      }}
      id="menu-appbar"
      onClick={handleClose}
      open={open}
      transformOrigin={{
        horizontal: 'right',
        vertical: 'top',
      }}
    >
      <MenuItem disabled>{auth.getEmail()}</MenuItem>
      <MenuItem onClick={onLogoutButtonClick}>
        <ExitIcon style={{ marginRight: '0.5rem' }} /> {'Logout'}
      </MenuItem>
    </Menu>
  </React.Fragment>
)

export default compose(
  withState('anchorEl', 'setAnchorEl', null),
  withProps(({ anchorEl }) => ({
    open: Boolean(anchorEl),
  })),
  withHandlers({
    handleClose: ({ setAnchorEl }) => event => {
      event.preventDefault()
      setAnchorEl(null)
    },
    handleMenu: ({ setAnchorEl }) => event => {
      event.preventDefault()
      setAnchorEl(event.currentTarget)
    },
    onLogoutButtonClick: () => async event => {
      event.preventDefault()
      await apiSignOut()
      window.location.href = '/login'
    },
  })
)(CustomUserMenuJSX)
