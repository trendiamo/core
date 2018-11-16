import classNames from 'classnames'
import DefaultIcon from '@material-ui/icons/ViewList'
import Link from 'shared/link'
import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'
import styled from 'styled-components'
import SvgIcon from '@material-ui/core/SvgIcon'
import Typography from '@material-ui/core/Typography'
import UserMenu from './user-menu'
import { compose, withState } from 'recompose'
import { withRouter } from 'react-router'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const itemIsActive = (resource, pathname) => {
  return pathname && pathname.startsWith(`/${resource.name}`)
}

const Content = ({ resources, classes, pathname, open }) => {
  return resources.map(resource => {
    const isActive = itemIsActive(resource, pathname)
    const itemClass = classNames(classes.menuItem, !open && classes.menuItemClosed)
    const textClass = classNames(classes.menuText, isActive && classes.menuTextActive)
    const iconClass = classNames(classes.menuIcon, isActive && classes.menuIconActive)
    return (
      <Link key={resource.name} to={`/${resource.name}`}>
        <MenuItem className={itemClass}>
          <SvgIcon className={iconClass}>
            <DefaultIcon />
          </SvgIcon>
          <Typography className={textClass} variant="body2">
            {open ? capitalizeFirstLetter(resource.name) : ''}
          </Typography>
        </MenuItem>
      </Link>
    )
  })
}

const Menu = ({ classes, pathname, resources, open, ...rest }) => (
  <Container {...rest}>
    <UserMenu classes={classes} open={open} />
    <Content classes={classes} open={open} pathname={pathname} resources={resources} />
  </Container>
)

const resources = [{ name: 'influencers' }]

export default compose(
  withRouter,
  withState('pathname', 'setPathname', ({ location }) => location.pathname),
  withState('resources', 'setResources', resources)
)(Menu)
