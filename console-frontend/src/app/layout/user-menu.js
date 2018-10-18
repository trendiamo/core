import AccountCircle from '@material-ui/icons/AccountCircle'
import { apiSignOut } from '../auth/utils'
import ExitIcon from '@material-ui/icons/PowerSettingsNew'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { compose, withHandlers, withProps, withState } from 'recompose'

const CustomUserMenuJSX = ({ onLogoutButtonClick, anchorEl, handleMenu, handleClose, open }) => (
  <div>
    <Tooltip title="UserMenuTooltip">
      <IconButton aria-haspopup="true" aria-owns={open ? 'menu-appbar' : null} color="inherit" onClick={handleMenu}>
        <AccountCircle />
      </IconButton>
    </Tooltip>
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
      <MenuItem disabled>{localStorage.getItem('authEmail')}</MenuItem>
      <MenuItem onClick={onLogoutButtonClick}>
        <ExitIcon style={{ marginRight: '0.5rem' }} /> {'Logout'}
      </MenuItem>
    </Menu>
  </div>
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
