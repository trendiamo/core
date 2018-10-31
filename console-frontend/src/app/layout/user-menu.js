import AccountCircle from '@material-ui/icons/AccountCircle'
import { apiSignOut } from '../auth/utils'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import auth from 'app/auth'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import ExitIcon from '@material-ui/icons/PowerSettingsNew'
import Link from 'shared/link'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'
import routes from 'app/routes'
import SettingsIcon from '@material-ui/icons/Settings'
import styled from 'styled-components'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'

const AvatarContainer = styled.div`
  width: 100%;
  padding: 20px 15px;
`

const AccountCircleCustom = styled(AccountCircle)`
  font-size: 4rem;
`

const StyledAvatar = styled(Avatar)`
  width: 64px;
  height: 64px;
`

// Common style for the menu icons goes here.
const MenuIconStyle = {
  marginRight: '0.5rem',
}

const UserMenu = ({
  initials,
  onLogoutButtonClick,
  anchorEl,
  handleMenu,
  handleClose,
  open,
  profilePicUrl,
  userIdentifier,
}) => (
  <React.Fragment>
    <AvatarContainer>
      <StyledAvatar size={100} src={profilePicUrl}>
        {profilePicUrl ? null : initials ? initials : <AccountCircleCustom />}
      </StyledAvatar>
    </AvatarContainer>
    <MenuItem
      aria-haspopup="true"
      aria-owns={open ? 'menu-appbar' : null}
      onClick={handleMenu}
      style={{ color: '#fff' }}
    >
      {userIdentifier}
      <ArrowDropDown />
    </MenuItem>
    <Divider style={{ background: '#6c6c71' }} />
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
          <SettingsIcon style={MenuIconStyle} />
          {'Account'}
        </MenuItem>
      </Link>
      <MenuItem onClick={onLogoutButtonClick}>
        <ExitIcon style={MenuIconStyle} /> {'Logout'}
      </MenuItem>
    </Menu>
  </React.Fragment>
)

export default compose(
  withState('anchorEl', 'setAnchorEl', null),
  withState('user', 'setUser', auth.getUser()),
  withProps(({ anchorEl, user }) => ({
    initials: !user.firstName || !user.lastName ? null : `${user.firstName[0]}${user.lastName[0]}`,
    open: Boolean(anchorEl),
    profilePicUrl: user.profilePicUrl,
    userIdentifier: (!user.firstName || !user.lastName ? null : `${user.firstName} ${user.lastName}`) || user.email,
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
    },
    updateUser: ({ setUser }) => user => {
      setUser(user)
    },
  }),
  lifecycle({
    componentDidMount() {
      const { updateUser } = this.props
      auth.addListener(updateUser)
    },
    componentWillUnmount() {
      const { updateUser } = this.props
      auth.removeListener(updateUser)
    },
  })
)(UserMenu)
