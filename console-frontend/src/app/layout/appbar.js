import compose from 'recompose/compose'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MuiAppBar from '@material-ui/core/AppBar'
import React from 'react'
import styled from 'styled-components'
import { toggleSidebar } from 'ra-core'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import UserMenu from './user-menu'
import withWidth from '@material-ui/core/withWidth'

const StyledIconButton = styled(IconButton)`
  margin-left: 0.5em;
  margin-right: 0.5em;
`

const StyledMenuIcon = styled(MenuIcon)`
  transition: transform 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  transform: ${({ open }) => (open ? 'rotate(0deg)' : 'rotate(180deg)')};
`

const StyledTypography = styled(Typography)`
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const StyledToolbar = styled(Toolbar)`
  padding-right: 24px;
`

const CustomAppBarJSX = ({ className, open, toggleSidebar, width, ...rest }) => (
  <MuiAppBar className={className} color="secondary" position="static" {...rest}>
    <StyledToolbar disableGutters variant={width === 'xs' ? 'regular' : 'dense'}>
      <StyledIconButton aria-label="open drawer" color="inherit" onClick={toggleSidebar}>
        <StyledMenuIcon open={open} />
      </StyledIconButton>
      <StyledTypography color="inherit" id="react-admin-title" variant="title">
        {'Plugiamo Console: '}
      </StyledTypography>
      <UserMenu />
    </StyledToolbar>{' '}
  </MuiAppBar>
)

const CustomAppBar = compose(
  connect(
    null,
    { toggleSidebar }
  ),
  withWidth()
)(CustomAppBarJSX)

export default CustomAppBar
