import ArrowBack from '@material-ui/icons/ArrowBack'
import HelpOutline from '@material-ui/icons/HelpOutline'
import Link from 'shared/link'
import MenuIcon from '@material-ui/icons/Menu'
import omit from 'lodash.omit'
import React, { memo, useCallback, useContext } from 'react'
import styled from 'styled-components'
import { drawerWidth, drawerWidthClosed } from './layout-styles'
import { Hidden, IconButton, AppBar as MuiAppBar, Toolbar, Typography } from '@material-ui/core'
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

const Title = styled(({ className, text }) => (
  <Typography className={className} variant="h6">
    {text}
  </Typography>
))`
  color: #333;
  display: inline-block;
  font-weight: 500;
  letter-spacing: 0.3px;
  font-size: 24px;
  margin-right: 2px;

  @media (max-width: 959.95px) {
    font-size: 16px;
  }
`

const AppBarContent = memo(() => {
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
      <Title text={title} />
      {Actions && (
        <ButtonsContainer>
          <OnboardingButton />
          {Actions}
        </ButtonsContainer>
      )}
    </>
  )
})

const StyledAppBar = styled(props => <MuiAppBar {...omit(props, ['hasScrolled', 'sidebarOpen'])} />)`
  background-color: #f5f5f5;
  box-shadow: none;
  color: #333;
  transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms, margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms,
    box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
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

  ${({ hasScrolled }) => hasScrolled && 'box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.1);'}
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

const AppBar = ({ hasScrolled, sidebarOpen, toggleOpen }) => (
  <StyledAppBar hasScrolled={hasScrolled} sidebarOpen={sidebarOpen}>
    <TopToolbar>
      <MenuButton aria-label="Open drawer" color="inherit" id="foofoo" onClick={toggleOpen}>
        <MenuIcon />
      </MenuButton>
      <AppBarContent />
    </TopToolbar>
  </StyledAppBar>
)

export default memo(AppBar)
