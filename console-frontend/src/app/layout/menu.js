import compose from 'recompose/compose'
import { connect } from 'react-redux'
import { DashboardMenuItem } from 'ra-ui-materialui'
import DefaultIcon from '@material-ui/icons/ViewList'
import { getResources } from 'ra-core'
import { MenuItemLink } from 'ra-ui-materialui'
import React from 'react'
import styled from 'styled-components'
import UserMenu from './user-menu'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const Menu = ({ dense, hasDashboard, onMenuClick, resources, ...rest }) => (
  <Div {...rest}>
    <UserMenu />
    {hasDashboard && <DashboardMenuItem onClick={onMenuClick} />}
    {resources.filter(r => r.hasList).map(resource => (
      <MenuItemLink
        dense={dense}
        key={resource.name}
        leftIcon={resource.icon ? <resource.icon /> : <DefaultIcon />}
        onClick={onMenuClick}
        primaryText={resource.name}
        style={{ color: '#ddd' }}
        to={`/${resource.name}`}
      />
    ))}
  </Div>
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
