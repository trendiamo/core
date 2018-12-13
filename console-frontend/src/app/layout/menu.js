import classNames from 'classnames'
import Link from 'shared/link'
import MenuItem from '@material-ui/core/MenuItem'
import omit from 'lodash.omit'
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

const resources = {
  triggers: { icon: TuneOutlined, label: 'Triggers', class: 'triggers', route: routes.triggersList() },
  curations: { icon: PersonPinOutlined, label: 'Curations', class: 'curations', route: routes.curationsList() },
  scriptedChats: {
    icon: SmsOutlined,
    label: 'Scripted Chats',
    class: 'scripted-chats',
    route: routes.scriptedChatsList(),
  },
  outros: { icon: AssignmentTurnedInOutlined, label: 'Outros', class: 'outros', route: routes.outrosList() },
  personas: { icon: AccountCircleOutlined, label: 'Personas', class: 'personas', route: routes.personasList() },
}

const resourceGroups = {
  main: {
    name: 'Main',
    showTitle: false,
    resources: [resources.triggers],
  },
  flows: {
    name: 'Flows',
    showTitle: true,
    resources: [resources.curations, resources.scriptedChats, resources.outros],
  },
  basic: {
    name: 'Basic',
    showTitle: true,
    resources: [resources.personas],
  },
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const GroupText = styled(({ ...props }) => <Typography {...omit(props, ['sidebarOpen'])} />)`
  color: ${({ sidebarOpen }) => (sidebarOpen ? '#fff' : '#333')}
  text-align: left;
  font-size: 12px;
  text-transform: uppercase;
  transition: 0.6s all;
  height: 1rem;
  line-height: 1rem;
  opacity: ${({ sidebarOpen }) => (sidebarOpen ? 1 : 0)};
  overflow: hidden;
  user-select: none;
  position: absolute;
`

const MenuItemGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: ${({ sidebarOpen, showTitle }) => (sidebarOpen ? '15px 0 0' : showTitle && '15px 0')};
  padding: ${({ sidebarOpen }) => (sidebarOpen ? '8px 16px 14px' : '0 16px')};
  ${({ showTitle }) => !showTitle && 'padding-bottom: 0'};
  height: ${({ sidebarOpen, showTitle }) => (showTitle ? !sidebarOpen && '2px' : '0px')};
  transition: 0.2s all;
  overflow: hidden;
  ${({ showTitle, sidebarOpen }) =>
    showTitle &&
    `&:before {
      content: '';
      position: absolute;
      left: 34px;
      top: 50%;
      transform: translate(-50%, -50%);
      width: ${sidebarOpen ? '60px' : '12px'};
      height: ${sidebarOpen ? '12px' : '2px'};
      background: ${!sidebarOpen && '#767676'};
      transition: ${sidebarOpen ? '.3s' : '.6s'} all;
    }`}
`

const itemIsActive = route => {
  const pathname = window.location.pathname
  return pathname && pathname.startsWith(route)
}

const Item = compose(
  withProps(({ resource }) => ({
    isActive: itemIsActive(resource.route),
  })),
  withProps(({ sidebarOpen, classes, isActive }) => ({
    itemClass: classNames(classes.menuItem, !sidebarOpen && classes.menuItemClosed),
    textClass: classNames(classes.menuText, isActive && classes.menuTextActive),
    iconClass: classNames(classes.menuIcon, isActive && classes.menuIconActive),
  }))
)(({ sidebarOpen, resource, itemClass, iconClass, textClass }) => (
  <div className={`onboard-${resource.class}`}>
    <Link key={resource.route} to={resource.route}>
      <MenuItem className={itemClass}>
        <SvgIcon className={iconClass}>{resource.icon ? React.createElement(resource.icon) : <DefaultIcon />}</SvgIcon>
        <Typography className={textClass} variant="body2">
          {sidebarOpen ? resource.label : ''}
        </Typography>
      </MenuItem>
    </Link>
  </div>
))

const Menu = ({ classes, sidebarOpen, ...rest }) => (
  <Container {...rest}>
    <UserMenu classes={classes} sidebarOpen={sidebarOpen} />
    {Object.keys(resourceGroups).map(group => (
      <div key={group}>
        <MenuItemGroup showTitle={resourceGroups[group].showTitle} sidebarOpen={sidebarOpen}>
          <GroupText sidebarOpen={sidebarOpen}>
            {resourceGroups[group].showTitle && resourceGroups[group].name}
          </GroupText>
        </MenuItemGroup>
        {resourceGroups[group].resources.map(resource => (
          <Item classes={classes} key={resource.route} resource={resource} sidebarOpen={sidebarOpen} />
        ))}
      </div>
    ))}
  </Container>
)

export default compose(withRouter)(Menu)
