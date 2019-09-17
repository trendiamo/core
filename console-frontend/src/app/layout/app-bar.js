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
import { useOnboardingConsumer } from 'ext/hooks/use-onboarding'
import { withRouter } from 'react-router'

const ButtonsContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  flex-flow: row wrap;
  align-items: center;
`

const StyledHelp = styled(IconButton)`
  & + * {
    margin-left: 10px;
  }
`

const OnboardingButton = withRouter(({ location }) => {
  const { onboarding, setOnboarding } = useOnboardingConsumer()

  const handleClick = useCallback(
    () => {
      setOnboarding({ ...onboarding, help: { ...onboarding.help, run: true } })
    },
    [onboarding, setOnboarding]
  )

  if (location.pathname !== onboarding.help.pathname || !onboarding.help.stepName) return null

  return (
    <Hidden smDown>
      <StyledHelp onClick={handleClick}>
        <HelpOutline />
      </StyledHelp>
    </Hidden>
  )
})

const AppBarContent = memo(({ showOnboarding }) => {
  const { store } = useContext(StoreContext)
  if (!store.appBarContent) return null

  const { Actions, backRoute, title } = store.appBarContent

  return (
    <>
      {backRoute && (
        <Link to={backRoute}>
          <ArrowBack style={{ verticalAlign: 'middle', color: '#222', marginRight: '0.5rem' }} />
        </Link>
      )}
      <Title>{title}</Title>
      {Actions && (
        <ButtonsContainer>
          {showOnboarding && <OnboardingButton />}
          {Actions}
        </ButtonsContainer>
      )}
    </>
  )
})

const StyledAppBar = styled(props => <MuiAppBar {...omit(props, ['hasScrolled', 'sidebarOpen'])} />)`
  background-color: ${showUpToUsBranding() ? '#e7ecef' : '#f5f5f5'};
  box-shadow: none;
  color: #333;
  transition: all 200ms ease-in-out;
  width: calc(100% - ${drawerWidthClosed}px);
  margin-left: ${drawerWidthClosed}px;
  z-index: 1201;
  position: sticky;
  top: 0;

  @media (max-width: 959.95px) {
    width: 100%;
    margin: 0;
  }

  ${({ sidebarOpen }) =>
    sidebarOpen &&
    `
  @media (min-width: 960px) {
    margin-left: ${drawerWidth}px;
    width: calc(100% - ${drawerWidth}px);
  }
  `}

  ${({ hasScrolled }) => hasScrolled && 'box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.1); background: #fff;'}
`

const TopToolbar = styled(Toolbar)`
  padding-left: 14px;
  padding-right: 14px;
  display: flex;
  height: 84px;
`

const MenuButton = styled(IconButton)`
  display: none;

  @media (max-width: 959.95px) {
    display: block;
  }
}
`

const AppBar = ({ hasScrolled, showOnboarding, sidebarOpen, toggleOpen }) => (
  <StyledAppBar hasScrolled={hasScrolled} sidebarOpen={sidebarOpen}>
    <TopToolbar>
      <MenuButton aria-label="Open drawer" color="inherit" id="foofoo" onClick={toggleOpen}>
        <MenuIcon />
      </MenuButton>
      <AppBarContent showOnboarding={showOnboarding} />
    </TopToolbar>
  </StyledAppBar>
)

export default memo(AppBar)
