import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import auth from 'auth'
import ExitIcon from '@material-ui/icons/PowerSettingsNew'
import Link from 'shared/link'
import ModalUserSettings from './modal-user-settings'
import omit from 'lodash.omit'
import PeopleOutline from '@material-ui/icons/PeopleOutline'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import { apiSignOut } from 'utils'
import { Avatar, Menu, MenuItem, Typography } from '@material-ui/core'
import { drawerWidth } from 'app/layout/layout-styles'
import { imgixUrl, stringifyRect } from 'plugin-base'

const avatarSize = 46

const StyledAvatar = styled(Avatar)`
  margin-right: 10px;
  transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms, height 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms,
    margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  height: ${avatarSize}px;
  width: ${avatarSize}px;
`

const StyledMenuItem = styled(props => <MenuItem {...omit(props, ['sidebarOpen'])} />)`
  flex-shrink: 0;
  transition: padding 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms, height 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms,
    visibility 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  visibility: visible;
  height: auto;
  ${({ sidebarOpen }) => !sidebarOpen && 'padding-left: 12px; padding-right: 12px;'}
`

const StyledArrowDropDown = styled(props => <ArrowDropDown {...omit(props, ['sidebarOpen'])} />)`
  color: #757575;
  position: absolute;
  right: 10px;
  transition: opacity 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  opacity: ${({ sidebarOpen }) => (sidebarOpen ? 1 : 0)};
`

const MenuItemThemed = styled(({ className, icon, text, ...props }) => (
  <MenuItem className={className} {...props}>
    {icon}
    <Typography style={{ marginLeft: '10px' }}>{text}</Typography>
  </MenuItem>
))`
  padding: 15px 21px;
  width: ${drawerWidth - 55}px;
`

const StyledTypography = styled(props => <Typography {...omit(props, ['sidebarOpen'])} />)`
  color: #222;
  ${({ sidebarOpen }) => !sidebarOpen && 'display: none;'}
`

const anchorOrigin = { horizontal: 'center', vertical: 'top' }
const transformOrigin = { horizontal: 'center', vertical: 'top' }

const UserMenu = ({ sidebarOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [user, setUser] = useState(auth.getUser())
  const [isUserSettingsModalOpen, setIsUserSettingsModalOpen] = useState(false)

  const initials = useMemo(
    () => (!user.firstName || !user.lastName ? null : `${user.firstName[0]}${user.lastName[0]}`),
    [user.firstName, user.lastName]
  )
  const isMenuOpen = useMemo(() => Boolean(anchorEl), [anchorEl])
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

  const openUserSettingsModal = useCallback(() => {
    setIsUserSettingsModalOpen(true)
  }, [])

  useEffect(() => {
    auth.addListener(setUser)
    return () => auth.removeListener(setUser)
  }, [])

  return (
    <div>
      <StyledMenuItem
        aria-haspopup="true"
        aria-owns={isMenuOpen ? 'menu-appbar' : null}
        onClick={handleMenu}
        sidebarOpen={sidebarOpen}
      >
        <StyledAvatar src={user.profilePicUrl && imgixUrl(user.profilePicUrl, { rect: stringifyRect(user.picRect) })}>
          {user.profilePicUrl ? null : initials ? initials : ''}
        </StyledAvatar>
        <StyledTypography sidebarOpen={sidebarOpen} variant="body1">
          {userIdentifier}
        </StyledTypography>
        <StyledArrowDropDown sidebarOpen={sidebarOpen} />
      </StyledMenuItem>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        disableAutoFocusItem
        id="menu-appbar"
        onClick={handleClose}
        open={isMenuOpen}
        style={{ left: '-10px' }}
        transformOrigin={transformOrigin}
      >
        {!auth.isSingleAccount() && (
          <Link to={routes.accounts()}>
            <MenuItemThemed icon={<PeopleOutline />} text="Back to Accounts" />
          </Link>
        )}
        <MenuItemThemed icon={<AccountCircleOutlined />} onClick={openUserSettingsModal} text="User Settings" />
        <MenuItemThemed icon={<ExitIcon />} onClick={onLogoutButtonClick} text="Logout" />
      </Menu>
      <ModalUserSettings open={isUserSettingsModalOpen} setOpen={setIsUserSettingsModalOpen} />
    </div>
  )
}

export default UserMenu
