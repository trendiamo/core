import auth from 'auth'
import DummyMenu from './dummy-menu'
import Link from 'shared/link'
import MenuIcon from '@material-ui/icons/Menu'
import omit from 'lodash.omit'
import pickBy from 'lodash.pickby'
import React, { memo, useMemo } from 'react'
import routes from 'app/routes'
import styled, { keyframes } from 'styled-components'
import UserMenu from './user-menu'
import {
  AccountCircleOutlined,
  AssignmentTurnedInOutlined,
  ViewList as DefaultIcon,
  Link as LinkIcon,
  PersonPinOutlined,
  PhotoLibrary,
  SmsOutlined,
  TuneOutlined,
} from '@material-ui/icons'
import { Divider, IconButton, MenuItem, SvgIcon, Typography } from '@material-ui/core'
import { useOnboardingConsumer } from 'ext/hooks/use-onboarding'
import { withRouter } from 'react-router'

const resources = {
  triggers: {
    icon: TuneOutlined,
    label: 'Triggers',
    class: 'triggers',
    isOwnerScoped: true,
    route: routes.triggersList(),
  },
  showcases: {
    icon: PersonPinOutlined,
    label: 'Showcases',
    class: 'showcases',
    isOwnerScoped: true,
    route: routes.showcasesList(),
  },
  simpleChats: {
    icon: SmsOutlined,
    label: 'Simple Chats',
    class: 'simple-chats',
    route: routes.simpleChatsList(),
  },
  outros: {
    icon: AssignmentTurnedInOutlined,
    label: 'Outros',
    class: 'outros',
    isOwnerScoped: true,
    route: routes.outrosList(),
  },
  personas: {
    icon: AccountCircleOutlined,
    label: 'Personas',
    class: 'personas',
    isOwnerScoped: true,
    route: routes.personasList(),
  },
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
    isOwnerScoped: true,
  },
}

const resourceGroups = {
  main: {
    name: 'Main',
    isOwnerScoped: true,
    showTitle: false,
    resources: [resources.triggers],
  },
  modules: {
    name: 'Modules',
    showTitle: true,
    resources: [resources.showcases, resources.simpleChats, resources.outros],
  },
  basic: {
    name: 'Basic',
    showTitle: true,
    resources: [resources.pictures, resources.personas],
  },
  tools: {
    name: 'Tools',
    isOwnerScoped: true,
    showTitle: true,
    resources: [resources.urlGenerator],
  },
}

const permittedResourceGroups = () => {
  if (auth.getUser().role !== 'editor' || auth.isAdmin()) return resourceGroups
  const filteredObject = pickBy(resourceGroups, group => !group['isOwnerScoped'])
  Object.keys(filteredObject).forEach(
    group =>
      (filteredObject[group]['resources'] = filteredObject[group]['resources'].filter(
        resource => !resource['isOwnerScoped']
      ))
  )
  return filteredObject
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
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  animation: ${fade} 1s;
`

const GroupText = styled(props => <Typography {...omit(props, ['sidebarOpen'])} />)`
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

const StyledMenuItem = styled(props => <MenuItem {...omit(props, ['isActive', 'sidebarOpen'])} />)`
  flex-shrink: 0;
  transition: padding 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms, height 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms,
    visibility 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  visibility: visible;

  ${({ isActive }) => isActive && 'background-color: rgba(0, 0, 0, 0.03);'}
  ${({ sidebarOpen }) =>
    !sidebarOpen && 'background-color: transparent; padding-left: 22px; padding-right: 0;'}
`

const MenuText = styled(props => <Typography {...omit(props, ['isActive'])} />)`
  color: #222;
  ${({ isActive }) => isActive && 'font-weight: bold;'}
`

const StyledSvgIcon = styled(props => <SvgIcon {...omit(props, ['isActive', 'sidebarOpen'])} />)`
  color: ${({ isActive, sidebarOpen }) => (sidebarOpen ? '#222' : isActive ? '#fff' : 'rgba(255,255,255,0.6)')};
  padding-right: 20px;
`

const Item = withRouter(({ location, resource, sidebarOpen }) => {
  const isActive = useMemo(() => location.pathname.startsWith(resource.route), [location.pathname, resource.route])

  return (
    <div className={`onboard-${resource.class}`}>
      <Link key={resource.route} to={resource.route}>
        <StyledMenuItem isActive={isActive} sidebarOpen={sidebarOpen}>
          <StyledSvgIcon isActive={isActive} sidebarOpen={sidebarOpen}>
            {resource.icon ? React.createElement(resource.icon) : <DefaultIcon />}
          </StyledSvgIcon>
          <MenuText isActive={isActive} variant="body1">
            {sidebarOpen ? resource.label : ''}
          </MenuText>
        </StyledMenuItem>
      </Link>
    </div>
  )
})

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
        <>
          <img alt="" src="/img/frekkls-logo.svg" />
          <IconButton aria-label="Toggle drawer" color="inherit" onClick={toggleOpen}>
            <MenuIcon />
          </IconButton>
        </>
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

const BaseMenu = withRouter(
  memo(({ location, menuLoaded, sidebarOpen, stageIndex, toggleOpen }) => {
    if (!menuLoaded && stageIndex === 0 && location.pathname === routes.root()) {
      return <DummyMenu />
    }

    return (
      <Container>
        <div style={{ flex: 1 }}>
          <MenuLogo sidebarOpen={sidebarOpen} toggleOpen={toggleOpen} />
          {Object.keys(permittedResourceGroups()).map(group => (
            <div key={group}>
              <MenuItemGroup showTitle={resourceGroups[group].showTitle} sidebarOpen={sidebarOpen}>
                <GroupText sidebarOpen={sidebarOpen}>
                  {resourceGroups[group].showTitle && resourceGroups[group].name}
                </GroupText>
              </MenuItemGroup>
              {resourceGroups[group].resources.map(resource => (
                <Item key={resource.route} resource={resource} sidebarOpen={sidebarOpen} />
              ))}
            </div>
          ))}
        </div>
        <UserMenu sidebarOpen={sidebarOpen} />
      </Container>
    )
  })
)

const Menu = ({ menuLoaded, sidebarOpen, toggleOpen }) => {
  const { onboarding } = useOnboardingConsumer()

  return (
    <BaseMenu
      menuLoaded={menuLoaded}
      sidebarOpen={sidebarOpen}
      stageIndex={onboarding.stageIndex}
      toggleOpen={toggleOpen}
    />
  )
}

export default Menu
