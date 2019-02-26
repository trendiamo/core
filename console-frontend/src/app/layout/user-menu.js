import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import auth from 'auth'
import classNames from 'classnames'
import ExitIcon from '@material-ui/icons/PowerSettingsNew'
import Link from 'shared/link'
import React from 'react'
import routes from 'app/routes'
import { apiSignOut } from 'utils'
import { Avatar, Menu, MenuItem, Typography } from '@material-ui/core'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'

const MenuItemThemed = ({ classes, icon, text, ...props }) => {
  return (
    <MenuItem className={classes.accountMenuItem} {...props}>
      {icon}
      <Typography className={classes.accountMenuText}>{text}</Typography>
    </MenuItem>
  )
}

const UserMenu = ({
  classes,
  initials,
  onLogoutButtonClick,
  anchorEl,
  handleMenu,
  handleClose,
  openMenu,
  sidebarOpen,
  profilePicUrl,
  userIdentifier,
}) => (
  <div>
    <MenuItem
      aria-haspopup="true"
      aria-owns={openMenu ? 'menu-appbar' : null}
      className={classNames(classes.menuItem)}
      onClick={handleMenu}
      style={{ height: 'auto', ...(!sidebarOpen ? { paddingLeft: '12px', paddingRight: '12px' } : {}) }}
    >
      <Avatar className={classNames(classes.avatar)} src={profilePicUrl}>
        {profilePicUrl ? null : initials ? initials : ''}
      </Avatar>
      <Typography className={classNames(classes.menuText, !sidebarOpen && classes.menuTextHidden)} variant="body1">
        {userIdentifier}
      </Typography>
      <ArrowDropDown className={classNames(classes.accountArrow, !sidebarOpen && classes.accountArrowHidden)} />
    </MenuItem>
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'top',
      }}
      className={classes.accountMenu}
      id="menu-appbar"
      onClick={handleClose}
      open={openMenu}
      transformOrigin={{
        horizontal: 'center',
        vertical: 'top',
      }}
    >
      <Link to={routes.account()}>
        <MenuItemThemed classes={classes} icon={<AccountCircleOutlined />} text="Account" />
      </Link>
      <MenuItemThemed classes={classes} icon={<ExitIcon />} onClick={onLogoutButtonClick} text="Logout" />
    </Menu>
  </div>
)

export default compose(
  withState('anchorEl', 'setAnchorEl', null),
  withState('user', 'setUser', auth.getUser()),
  withProps(({ anchorEl, user }) => ({
    initials: !user.firstName || !user.lastName ? null : `${user.firstName[0]}${user.lastName[0]}`,
    openMenu: Boolean(anchorEl),
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
