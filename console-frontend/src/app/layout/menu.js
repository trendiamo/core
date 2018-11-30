import classNames from 'classnames'
import Link from 'shared/link'
import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import SvgIcon from '@material-ui/core/SvgIcon'
import Typography from '@material-ui/core/Typography'
import UserMenu from './user-menu'
import {
  AccountCircleOutlined,
  AssignmentTurnedInOutlined,
  ViewList as DefaultIcon,
  PersonPinOutlined,
  SmsOutlined,
  TuneOutlined,
} from '@material-ui/icons'
import { compose, withProps } from 'recompose'
import { withRouter } from 'react-router'

const resources = [
  { icon: TuneOutlined, label: 'Triggers', route: routes.triggersList() },
  { icon: PersonPinOutlined, label: 'Curations', route: routes.curationsList() },
  { icon: SmsOutlined, label: 'Scripted Chats', route: routes.scriptedChatsList() },
  { icon: AssignmentTurnedInOutlined, label: 'Outros', route: routes.outrosList() },
  { icon: AccountCircleOutlined, label: 'Personas', route: routes.personasList() },
]

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const itemIsActive = route => {
  const pathname = window.location.pathname
  return pathname && pathname.startsWith(route)
}

const Item = compose(
  withProps(({ resource }) => ({
    isActive: itemIsActive(resource.route),
  })),
  withProps(({ open, classes, isActive }) => ({
    itemClass: classNames(classes.menuItem, !open && classes.menuItemClosed),
    textClass: classNames(classes.menuText, isActive && classes.menuTextActive),
    iconClass: classNames(classes.menuIcon, isActive && classes.menuIconActive),
  }))
)(({ open, resource, itemClass, iconClass, textClass }) => (
  <Link key={resource.route} to={resource.route}>
    <MenuItem className={itemClass}>
      <SvgIcon className={iconClass}>{resource.icon ? React.createElement(resource.icon) : <DefaultIcon />}</SvgIcon>
      <Typography className={textClass} variant="body2">
        {open ? resource.label : ''}
      </Typography>
    </MenuItem>
  </Link>
))

const Menu = ({ classes, open, ...rest }) => (
  <Container {...rest}>
    <UserMenu classes={classes} open={open} />
    {resources.map(resource => (
      <Item classes={classes} key={resource.route} open={open} resource={resource} />
    ))}
  </Container>
)

export default compose(withRouter)(Menu)
