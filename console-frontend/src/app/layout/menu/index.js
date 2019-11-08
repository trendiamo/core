import auth from 'auth'
import DummyMenu from './dummy-menu'
import ImpactPoints from './impact-points'
import Link from 'shared/link'
import MenuIcon from '@material-ui/icons/Menu'
import omit from 'lodash.omit'
import React, { memo, useMemo } from 'react'
import ReferralBox from './referral-box'
import routes from 'app/routes'
import styled, { keyframes } from 'styled-components'
import UserMenu from './user-menu'
import { affiliateResourceGroups, editorResourceGroups, resourceGroups } from './resource-groups'
import { ViewList as DefaultIcon } from '@material-ui/icons'
import { Divider, MenuItem, SvgIcon, Typography } from '@material-ui/core'
import { ReactComponent as FrekklsLogo } from 'assets/icons/frekkls-logo.svg'
import { IconButton } from 'shared/form-elements'
import { showUpToUsBranding } from 'utils'
import { ReactComponent as UpToUsLogo } from 'assets/icons/uptous-logo-short.svg'
import { useOnboardingConsumer } from 'ext/hooks/use-onboarding'
import { withRouter } from 'react-router'

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

const GroupText = styled(Typography)`
  color: #222;
  text-align: left;
  font-size: 12px;
  text-transform: uppercase;
  transition: 0.6s all;
  height: 1rem;
  line-height: 1rem;
  opacity: 1;
  overflow: hidden;
  user-select: none;
  position: absolute;
`

const MenuItemGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 15px 0 0;
  padding: 8px 16px 14px;
  ${({ showTitle }) => !showTitle && 'padding-bottom: 0'};
  height: ${({ showTitle }) => (showTitle ? 'auto' : '0px')};
  overflow: hidden;
  ${({ showTitle }) =>
    showTitle &&
    `&:before {
      content: '';
      position: absolute;
      left: 34px;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 60px
      height: 12px
    }`}
`

const StyledMenuItem = styled(props => <MenuItem {...omit(props, ['isActive'])} />)`
  flex-shrink: 0;
  transition: all 0.2s ease-in-out;
  visibility: visible;

  background: ${({ isActive }) => isActive && (showUpToUsBranding() ? '#e7ecef' : 'rgba(0, 0, 0, 0.03)')};
  &:hover,
  &:focus {
    background: ${showUpToUsBranding() ? '#e7ecef' : 'rgba(0, 0, 0, 0.03)'};
  }
`

const MenuText = styled(props => <Typography {...omit(props, ['isActive'])} />)`
  ${showUpToUsBranding() ? 'font-size: 14px; color: #272932;' : 'color: #222;'}
  padding-left: 20px;
  ${({ isActive }) => (showUpToUsBranding() || isActive) && 'font-weight: bold;'}
`

const StyledSvgIcon = styled(SvgIcon)`
  color: #222;
  width: 30px;
  height: 30px;
`

const StyledFrekklsLogo = styled(FrekklsLogo)`
  width: 140px;
`

const StyledUpToUsLogo = styled(UpToUsLogo)`
  width: 140px;
`

const Item = withRouter(({ location, resource, sidebarOpen }) => {
  const isActive = useMemo(() => location.pathname.startsWith(resource.route()), [location.pathname, resource])

  return (
    <div className={`onboard-${resource.class}`}>
      <Link key={resource.route()} to={resource.route()}>
        <StyledMenuItem isActive={isActive}>
          <StyledSvgIcon>{resource.icon ? React.createElement(resource.icon) : <DefaultIcon />}</StyledSvgIcon>
          <MenuText isActive={isActive} variant="body1">
            {sidebarOpen ? resource.label : ''}
          </MenuText>
        </StyledMenuItem>
      </Link>
    </div>
  )
})

const MenuLogo = ({ toggleOpen, isFoldable }) => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '85px' }}>
    <div
      style={{
        flex: 1,
        display: 'flex',
        paddingLeft: '20px',
        paddingRight: '10px',
        justifyContent: showUpToUsBranding() ? 'center' : 'space-between',
        alignItems: 'center',
      }}
    >
      {showUpToUsBranding() ? <StyledUpToUsLogo /> : <StyledFrekklsLogo />}
      {isFoldable && (
        <IconButton aria-label="Toggle drawer" color="inherit" onClick={toggleOpen}>
          <MenuIcon />
        </IconButton>
      )}
    </div>
    <Divider color="#e3e3e3" />
  </div>
)

const BaseMenu = withRouter(
  memo(({ location, menuLoaded, sidebarOpen, stageIndex, toggleOpen, isFoldable }) => {
    if (!menuLoaded && stageIndex === 0 && location.pathname === routes.welcome()) {
      return <DummyMenu />
    }

    const userRoleResourceGroups = useMemo(() => {
      if (auth.isAffiliate()) return affiliateResourceGroups()
      return auth.isAdmin() || auth.getAccountRole() !== 'editor' ? resourceGroups() : editorResourceGroups()
    }, [])

    return (
      <Container>
        <div style={{ flex: 1 }}>
          <MenuLogo isFoldable={isFoldable} sidebarOpen={sidebarOpen} toggleOpen={toggleOpen} />
          {Object.keys(userRoleResourceGroups).map(groupName => (
            <div key={groupName}>
              <MenuItemGroup showTitle={userRoleResourceGroups[groupName].showTitle}>
                <GroupText>
                  {userRoleResourceGroups[groupName].showTitle && userRoleResourceGroups[groupName].name}
                </GroupText>
              </MenuItemGroup>
              {userRoleResourceGroups[groupName].resources.map(resource => (
                <Item key={resource.route()} resource={resource} sidebarOpen={sidebarOpen} />
              ))}
            </div>
          ))}
          {auth.isAffiliate() && <ReferralBox sidebarOpen={sidebarOpen} />}
        </div>
        {auth.isAffiliate() && <ImpactPoints sidebarOpen={sidebarOpen} />}
        <UserMenu sidebarOpen={sidebarOpen} />
      </Container>
    )
  })
)

const Menu = ({ menuLoaded, sidebarOpen, toggleOpen, isFoldable }) => {
  const { onboarding } = useOnboardingConsumer()

  return (
    <BaseMenu
      isFoldable={isFoldable}
      menuLoaded={menuLoaded}
      sidebarOpen={sidebarOpen}
      stageIndex={onboarding.stageIndex}
      toggleOpen={toggleOpen}
    />
  )
}

export default Menu
