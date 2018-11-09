import classNames from 'classnames'
import compose from 'recompose/compose'
import DefaultIcon from '@material-ui/icons/ViewList'
import Link from 'shared/link'
import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'
import styled from 'styled-components'
import SvgIcon from '@material-ui/core/SvgIcon'
import Typography from '@material-ui/core/Typography'
import UserMenu from './user-menu'
import { connect } from 'react-redux'
import { DashboardMenuItem } from 'ra-ui-materialui'
import { getResources } from 'ra-core'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const itemIsActive = (resource, pathname) => {
  return pathname && pathname.startsWith(`/${resource.name}`)
}

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const Content = ({ resources, classes, pathname, open }) => {
  return resources
    .filter(r => r.hasList)
    .map(resource => {
      const isActive = itemIsActive(resource, pathname)
      const itemClass = classNames(classes.menuItem, !open && classes.menuItemClosed)
      const textClass = classNames(classes.menuText, isActive && classes.menuTextActive)
      const iconClass = classNames(classes.menuIcon, isActive && classes.menuIconActive)
      return (
        <Link key={resource.name} to={`/${resource.name}`}>
          <MenuItem className={itemClass}>
            <SvgIcon className={iconClass}>{resource.icon ? <resource.icon /> : <DefaultIcon />}</SvgIcon>
            <Typography className={textClass} variant="body2">
              {open ? capitalizeFirstLetter(resource.name) : ''}
            </Typography>
          </MenuItem>
        </Link>
      )
    })
}

const Menu = ({ classes, hasDashboard, onMenuClick, resources, pathname, open, ...rest }) => (
  <Container {...rest}>
    <UserMenu classes={classes} open={open} />
    {hasDashboard && <DashboardMenuItem onClick={onMenuClick} />}
    <Content classes={classes} open={open} pathname={pathname} resources={resources} />
  </Container>
)

Menu.defaultProps = {
  onMenuClick: () => null,
}

const mapStateToProps = state => ({
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
        prev.resources.every((value, index) => value === next.resources[index]) && prev.pathname === next.pathname,
    }
  )
)(Menu)
