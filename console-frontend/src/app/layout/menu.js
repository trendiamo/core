import compose from 'recompose/compose'
import { connect } from 'react-redux'
import { DashboardMenuItem } from 'ra-ui-materialui'
import DefaultIcon from '@material-ui/icons/ViewList'
import { getResources } from 'ra-core'
import { MenuItemLink } from 'ra-ui-materialui'
import React from 'react'
import styled from 'styled-components'
import UserMenu from './user-menu'
import { withStyles } from '@material-ui/core/styles'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const MenuItemStyles = theme => ({
  active: {
    color: theme.palette.secondary.main,
  },
  root: {
    color: theme.palette.grey[500],
  },
})

const StyledMenuItemLink = withStyles(MenuItemStyles, { index: 2 })(({ classes, ...props }) => (
  <MenuItemLink classes={classes} {...props} />
))

const Menu = ({ dense, hasDashboard, onMenuClick, resources, ...rest }) => (
  <Container {...rest}>
    <UserMenu />
    {hasDashboard && <DashboardMenuItem onClick={onMenuClick} />}
    {resources.filter(r => r.hasList).map(resource => (
      <StyledMenuItemLink
        dense={dense}
        key={resource.name}
        leftIcon={resource.icon ? <resource.icon /> : <DefaultIcon />}
        onClick={onMenuClick}
        primaryText={resource.name}
        to={`/${resource.name}`}
      />
    ))}
  </Container>
)

Menu.defaultProps = {
  onMenuClick: () => null,
}

const mapStateToProps = state => ({
  open: state.admin.ui.sidebarOpen,
  pathname: state.routing.location.pathname, // used to force redraw on navigation
  resources: getResources(state),
})

export default compose(
  connect(
    mapStateToProps,
    {},
    null,
    {
      areStatePropsEqual: (prev, next) =>
        prev.resources.every((value, index) => value === next.resources[index]) &&
        prev.pathname === next.pathname &&
        prev.open === next.open,
    }
  )
)(Menu)
