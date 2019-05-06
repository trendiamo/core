import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import auth from 'auth'
import classNames from 'classnames'
import ExitIcon from '@material-ui/icons/PowerSettingsNew'
import Link from 'shared/link'
import PeopleOutline from '@material-ui/icons/PeopleOutline'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import routes from 'app/routes'
import { apiSignOut } from 'utils'
import { Avatar, Menu, MenuItem, Typography } from '@material-ui/core'

const MenuItemThemed = ({ classes, icon, text, ...props }) => (
  <MenuItem className={classes.accountMenuItem} {...props}>
    {icon}
    <Typography className={classes.accountMenuText}>{text}</Typography>
  </MenuItem>
)

const UserMenu = ({ classes, sidebarOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [user, setUser] = useState(auth.getUser())

  const initials = useMemo(
    () => (!user.firstName || !user.lastName ? null : `${user.firstName[0]}${user.lastName[0]}`),
    [user.firstName, user.lastName]
  )
  const openMenu = useMemo(() => Boolean(anchorEl), [anchorEl])
  const userIdentifier = useMemo(
    () => (!user.firstName || !user.lastName ? null : `${user.firstName} ${user.lastName}`) || user.email,
    [user.email, user.firstName, user.lastName]
  )

  const handleClose = useCallback(event => {
    event.preventDefault()
    setAnchorEl(null)
  }, [])

  const handleMenu = useCallback(event => {
    event.preventDefault()
    setAnchorEl(event.currentTarget)
  }, [])

  const onLogoutButtonClick = useCallback(event => {
    ;(async () => {
      event.preventDefault()
      await apiSignOut()
    })()
  }, [])

  useEffect(() => {
    auth.addListener(setUser)
    return () => auth.removeListener(setUser)
  }, [])

  return (
    <div>
      <MenuItem
        aria-haspopup="true"
        aria-owns={openMenu ? 'menu-appbar' : null}
        className={classNames(classes.menuItem)}
        onClick={handleMenu}
        style={{ height: 'auto', ...(!sidebarOpen ? { paddingLeft: '12px', paddingRight: '12px' } : {}) }}
      >
        <Avatar className={classNames(classes.avatar)} src={user.profilePicUrl}>
          {user.profilePicUrl ? null : initials ? initials : ''}
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
        {auth.isAdmin() && (
          <Link to={routes.admin()}>
            <MenuItemThemed
              classes={classes}
              icon={<PeopleOutline />}
              onClick={auth.clearAdminSessionAccount}
              text="Back to Accounts"
            />
          </Link>
        )}
        <Link to={routes.account()}>
          <MenuItemThemed classes={classes} icon={<AccountCircleOutlined />} text="Account" />
        </Link>
        <MenuItemThemed classes={classes} icon={<ExitIcon />} onClick={onLogoutButtonClick} text="Logout" />
      </Menu>
    </div>
  )
}

export default UserMenu
