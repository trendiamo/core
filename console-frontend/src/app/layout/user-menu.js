import AccountCircle from '@material-ui/icons/AccountCircle'
import { apiSignOut } from '../auth/utils'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import auth from 'app/auth'
import Divider from '@material-ui/core/Divider'
import ExitIcon from '@material-ui/icons/PowerSettingsNew'
import Link from 'shared/link'
import Lock from '@material-ui/icons/Lock'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'
import routes from 'app/routes'
import SettingsIcon from '@material-ui/icons/Settings'
import styled from 'styled-components'
import { compose, withHandlers, withProps, withState } from 'recompose'

const AvatarContainer = styled.div`
  width: 100%;
  padding: 20px;
`

const Avatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  font-weight: 700;
  border: 1px solid #fff;
  overflow: hidden;
  text-align: center;
  background: #fff;
  color: #32333d;
`

const AccountInitials = styled.div`
  padding-top: 12px;
  font-size: 2rem;
  letter-spacing: 2px;
`

const AccountCircleCustom = styled(AccountCircle)`
  font-size: 3.8rem;
`

// Common style for menu items goes here.
const MenuItemStyle = {
  marginRight: '0.5rem',
}

const UserMenu = ({ initials, onLogoutButtonClick, anchorEl, handleMenu, handleClose, open }) => (
  <React.Fragment>
    <AvatarContainer>
      <Avatar>{initials ? <AccountInitials>{initials}</AccountInitials> : <AccountCircleCustom />}</Avatar>
    </AvatarContainer>
    <MenuItem
      aria-haspopup="true"
      aria-owns={open ? 'menu-appbar' : null}
      onClick={handleMenu}
      style={{ color: '#ddd' }}
    >
      {auth.getDisplayName() || auth.getEmail()}
      <ArrowDropDown />
    </MenuItem>
    <Divider style={{ background: '#aaa' }} />
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'top',
      }}
      id="menu-appbar"
      onClick={handleClose}
      open={open}
      transformOrigin={{
        horizontal: 'center',
        vertical: 'top',
      }}
    >
      <Link to={routes.account()}>
        <MenuItem>
          <SettingsIcon style={MenuItemStyle} />
          {'Account'}
        </MenuItem>
      </Link>
      <Link to={routes.passwordChange()}>
        <MenuItem>
          <Lock style={MenuItemStyle} /> {'Change Password'}
        </MenuItem>
      </Link>
      <MenuItem onClick={onLogoutButtonClick}>
        <ExitIcon style={MenuItemStyle} /> {'Logout'}
      </MenuItem>
    </Menu>
  </React.Fragment>
)

export default compose(
  withState('anchorEl', 'setAnchorEl', null),
  withProps(({ anchorEl }) => ({
    initials: auth.getInitials(),
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
      window.location.href = routes.login()
    },
  })
)(UserMenu)
