import ArrowBack from '@material-ui/icons/ArrowBack'
import HelpOutline from '@material-ui/icons/HelpOutline'
import Link from 'shared/link'
import MenuIcon from '@material-ui/icons/Menu'
import omit from 'lodash.omit'
import React, { memo, useCallback, useContext } from 'react'
import styled from 'styled-components'
import Title from 'shared/main-title'
import { drawerWidth, drawerWidthClosed } from './layout-styles'
import { Hidden, AppBar as MuiAppBar, Toolbar } from '@material-ui/core'
import { IconButton } from 'shared/form-elements'
import { showUpToUsBranding } from 'utils'
import { StoreContext } from 'ext/hooks/store'
import { useLocation } from 'react-router-dom'
import { useOnboardingConsumer } from 'ext/hooks/use-onboarding'

const ButtonsContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  flex-flow: row wrap;
  align-items: center;
`

const StyledHelp = styled(IconButton)`
  ${showUpToUsBranding() &&
    `background: transparent;
     &:hover {
       background: transparent;
     }`}
  & + * {
    margin-left: 10px;
  }
`

const OnboardingButton = () => {
  const location = useLocation()

  const { onboarding, setOnboarding } = useOnboardingConsumer()

  const handleClick = useCallback(() => {
    setOnboarding({ ...onboarding, help: { ...onboarding.help, run: true } })
  }, [onboarding, setOnboarding])

  if (location.pathname !== onboarding.help.pathname || !onboarding.help.stepName) return null

  return (
    <Hidden smDown>
      <StyledHelp onClick={handleClick}>
        <HelpOutline />
      </StyledHelp>
    </Hidden>
  )
}

const AppBarTitle = ({ backRoute, backRouteTitle, title }) => {
  if (!backRoute) return <Title>{title}</Title>

  return (
    <>
      <Link to={backRoute}>
        <ArrowBack style={{ verticalAlign: 'middle', color: '#222', marginRight: '0.5rem' }} />
        {backRouteTitle && <Title>{title}</Title>}
      </Link>
      {!backRouteTitle && <Title>{title}</Title>}
    </>
  )
}

const AppBarActions = ({ showOnboarding, Actions }) => {
  return (
    <ButtonsContainer>
      {showOnboarding && <OnboardingButton />}
      {Actions}
    </ButtonsContainer>
  )
}

const AppBarContent = ({ Actions, backRoute, showOnboarding, title, backRouteTitle }) => (
  <>
    <AppBarTitle backRoute={backRoute} backRouteTitle={backRouteTitle} title={title} />
    <AppBarActions Actions={Actions} showOnboarding={showOnboarding} />
  </>
)

const MemoedAppBarContent = memo(AppBarContent)

const StyledAppBar = styled(props => <MuiAppBar {...omit(props, ['hasScrolled', 'sidebarOpen', 'sticky'])} />)`
  background-color: ${showUpToUsBranding() ? '#e7ecef' : '#f5f5f5'};
  box-shadow: none;
  color: #333;
  transition: all 200ms ease-in-out;
  z-index: 1201;
  position: ${({ sticky = true }) => (sticky ? 'sticky' : 'static')};
  top: 0;
  width: 100%;
  margin: 0;

  @media (min-width: 960px) {
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? drawerWidth : drawerWidthClosed)}px;
    width: calc(100% - ${({ sidebarOpen }) => (sidebarOpen ? drawerWidth : drawerWidthClosed)}px);
  }

  ${({ hasScrolled, sticky = true }) =>
    hasScrolled &&
    sticky &&
    `
    box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.1);
    background: #fff;
  `}
`

const TopToolbar = styled(Toolbar)`
  padding-left: 14px;
  padding-right: 14px;
  display: flex;
  height: 84px;
`

const MenuButton = styled(IconButton)`
  display: block;
  @media (min-width: 960px) {
    display: none;
  }
`

const AppBar = ({ hasScrolled, showOnboarding, sidebarOpen, toggleOpen }) => {
  const { store } = useContext(StoreContext)
  if (!store.appBarContent) return null

  const { Actions, backRoute, backRouteTitle, sticky, title } = store.appBarContent

  return (
    <StyledAppBar hasScrolled={hasScrolled} sidebarOpen={sidebarOpen} sticky={sticky}>
      <TopToolbar>
        <MenuButton aria-label="Open drawer" color="inherit" id="foofoo" onClick={toggleOpen}>
          <MenuIcon />
        </MenuButton>
        <MemoedAppBarContent
          Actions={Actions}
          backRoute={backRoute}
          backRouteTitle={backRouteTitle}
          showOnboarding={showOnboarding}
          title={title}
        />
      </TopToolbar>
    </StyledAppBar>
  )
}

export default memo(AppBar)
