import classNames from 'classnames'
import DummyMenu from './dummy-menu'
import Link from 'shared/link'
import MenuIcon from '@material-ui/icons/Menu'
import omit from 'lodash.omit'
import React from 'react'
import routes from 'app/routes'
import styled, { keyframes } from 'styled-components'
import UserMenu from './user-menu'
import {
  AccountCircleOutlined,
  AssignmentTurnedInOutlined,
  ViewList as DefaultIcon,
  DirectionsOutlined,
  Link as LinkIcon,
  PersonPinOutlined,
  PhotoLibrary,
  SmsOutlined,
  TuneOutlined,
} from '@material-ui/icons'
import { branch, compose, renderComponent, withProps } from 'recompose'
import { Divider, IconButton, MenuItem, SvgIcon, Typography } from '@material-ui/core'
import { withOnboardingConsumer } from 'ext/recompose/with-onboarding'

const resources = {
  triggers: { icon: TuneOutlined, label: 'Triggers', class: 'triggers', route: routes.triggersList() },
  showcases: { icon: PersonPinOutlined, label: 'Showcases', class: 'showcases', route: routes.showcasesList() },
  simpleChats: {
    icon: SmsOutlined,
    label: 'Simple Chats',
    class: 'simple-chats',
    route: routes.simpleChatsList(),
  },
  outros: { icon: AssignmentTurnedInOutlined, label: 'Outros', class: 'outros', route: routes.outrosList() },
  navigations: {
    icon: DirectionsOutlined,
    label: 'Navigations',
    class: 'navigations',
    route: routes.navigationsList(),
  },
  personas: { icon: AccountCircleOutlined, label: 'Personas', class: 'personas', route: routes.personasList() },
  pictures: {
    icon: PhotoLibrary,
    label: 'Pictures',
    class: 'pictures',
    route: routes.picturesList(),
  },
  urlGenerator: {
    icon: LinkIcon,
    label: 'Url Generator',
    class: 'urlGenerator',
    route: routes.urlGenerator(),
  },
}

const resourceGroups = {
  main: {
    name: 'Main',
    showTitle: false,
    resources: [resources.triggers],
  },
  modules: {
    name: 'Modules',
    showTitle: true,
    resources: [resources.showcases, resources.navigations, resources.simpleChats, resources.outros],
  },
  basic: {
    name: 'Basic',
    showTitle: true,
    resources: [resources.pictures, resources.personas],
  },
  tools: {
    name: 'Tools',
    showTitle: true,
    resources: [resources.urlGenerator],
  },
}

const fade = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  animation: ${fade} 1s;
`

const GroupText = styled(({ ...props }) => <Typography {...omit(props, ['sidebarOpen'])} />)`
  color: ${({ sidebarOpen }) => (sidebarOpen ? '#222' : '#fff')}
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
  padding: 8px 16px 14px;
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
      background: ${!sidebarOpen && 'rgba(255,255,255,0.6)'};
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
    itemClass: classNames(classes.menuItem, isActive && classes.menuItemActive, !sidebarOpen && classes.menuItemClosed),
    textClass: classNames(classes.menuText, isActive && classes.menuTextActive),
    iconClass: classNames(
      classes.menuIcon,
      !sidebarOpen && classes.menuIconClosed,
      !sidebarOpen && isActive && classes.menuIconClosedActive
    ),
  }))
)(({ sidebarOpen, resource, itemClass, iconClass, textClass }) => (
  <div className={`onboard-${resource.class}`}>
    <Link key={resource.route} to={resource.route}>
      <MenuItem className={itemClass}>
        <SvgIcon className={iconClass}>{resource.icon ? React.createElement(resource.icon) : <DefaultIcon />}</SvgIcon>
        <Typography className={textClass} variant="body1">
          {sidebarOpen ? resource.label : ''}
        </Typography>
      </MenuItem>
    </Link>
  </div>
))

const MenuLogo = ({ sidebarOpen, toggleOpen }) => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '85px' }}>
    <div
      style={{
        flex: 1,
        display: 'flex',
        paddingLeft: sidebarOpen ? '20px' : 0,
        paddingRight: sidebarOpen ? '10px' : 0,
        justifyContent: sidebarOpen ? 'space-between' : 'center',
        alignItems: 'center',
      }}
    >
      {sidebarOpen ? (
        <React.Fragment>
          <img alt="" src="/img/frekkls-logo.svg" />
          <IconButton aria-label="Toggle drawer" color="inherit" onClick={toggleOpen}>
            <MenuIcon />
          </IconButton>
        </React.Fragment>
      ) : (
        <IconButton onClick={toggleOpen}>
          <img
            alt=""
            src="/img/frekkls-logo-small.svg"
            style={{ width: '30px', height: '30px', objectFit: 'contain' }}
          />
        </IconButton>
      )}
    </div>
    <Divider color={sidebarOpen ? '#e3e3e3' : 'rgba(255,255,255,0.6)'} />
  </div>
)

const Menu = ({ classes, sidebarOpen, toggleOpen, ...rest }) => (
  <Container {...omit(rest, ['onboarding'])}>
    <div style={{ flex: 1 }}>
      <MenuLogo sidebarOpen={sidebarOpen} toggleOpen={toggleOpen} />
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
    </div>
    <UserMenu classes={classes} sidebarOpen={sidebarOpen} />
  </Container>
)

export default compose(
  withOnboardingConsumer,
  branch(
    ({ location, onboarding, menuLoaded }) =>
      !menuLoaded && onboarding.stageIndex === 0 && location.pathname === routes.root(),
    renderComponent(DummyMenu)
  )
)(Menu)
