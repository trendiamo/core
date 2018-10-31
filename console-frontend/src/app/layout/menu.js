import compose from 'recompose/compose'
import { connect } from 'react-redux'
import { DashboardMenuItem } from 'ra-ui-materialui'
import DefaultIcon from '@material-ui/icons/ViewList'
import { getResources } from 'ra-core'
import Link from 'shared/link'
import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import UserMenu from './user-menu'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const Menu = ({ classes, hasDashboard, onMenuClick, resources, pathname, ...rest }) => (
  <Container {...rest}>
    <UserMenu />
    {hasDashboard && <DashboardMenuItem onClick={onMenuClick} />}
    {resources.filter(r => r.hasList).map(resource => (
      <Link key={resource.name} to={`/${resource.name}`}>
        <MenuItem>
          {resource.icon ? (
            <resource.icon />
          ) : (
            <DefaultIcon
              classes={{ root: pathname === `/${resource.name}` ? classes.menuItemIconActive : classes.menuItemIcon }}
            />
          )}
          <Typography
            className={pathname === `/${resource.name}` ? classes.menuItemActive : classes.menuItem}
            variant="body2"
          >
            {resource.name}
          </Typography>
        </MenuItem>
      </Link>
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
