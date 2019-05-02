import ArrowBack from '@material-ui/icons/ArrowBack'
import classNames from 'classnames'
import HelpOutline from '@material-ui/icons/HelpOutline'
import Link from 'shared/link'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import { branch, compose, renderNothing, withProps } from 'recompose'
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

const OnboardingButton = compose(withRouter)(({ location }) => {
  const { onboarding, setOnboarding } = useOnboardingConsumer()
  const handleClick = useCallback(() => {
    setOnboarding({ ...onboarding, help: { ...onboarding.help, run: true } })
  })
  if (location.pathname !== onboarding.help.pathname) return null

  return (
    <Hidden smDown>
      <StyledHelp onClick={handleClick}>
        <HelpOutline />
      </StyledHelp>
    </Hidden>
  )
})

const Title = ({ text, classes, responsive, highlight }) => (
  <Typography
    className={classNames(classes.title, highlight && classes.titleHighlight, responsive && classes.titleResponsive)}
    variant="h6"
  >
    {text}
  </Typography>
)

const AppBarContent1 = ({ Actions, backRoute, classes, title }) => (
  <React.Fragment>
    {backRoute && (
      <Link to={backRoute}>
        <ArrowBack style={{ verticalAlign: 'middle', color: '#222', marginRight: '0.5rem' }} />
      </Link>
    )}
    <Title classes={classes} text={title} />
    {Actions && (
      <ButtonsContainer>
        {<OnboardingButton />}
        {Actions}
      </ButtonsContainer>
    )}
  </React.Fragment>
)

const AppBarContent2 = compose(
  branch(({ store }) => !store.appBarContent, renderNothing),
  withProps(({ store }) => ({
    Actions: store.appBarContent.Actions,
    backRoute: store.appBarContent.backRoute,
    title: store.appBarContent.title,
  }))
)(AppBarContent1)

const AppBarContent3 = props => {
  const { store, setStore } = useContext(StoreContext)
  return <AppBarContent2 {...{ ...props, store, setStore }} />
}

const AppBar = ({ classes, hasScrolled, sidebarOpen, toggleOpen }) => (
  <MuiAppBar
    className={classNames(classes.appBar, sidebarOpen && classes.appBarShift, hasScrolled && classes.appBarScroll)}
  >
    <Toolbar className={classes.topToolbar}>
      <IconButton aria-label="Open drawer" className={classes.menuButton} color="inherit" onClick={toggleOpen}>
        <MenuIcon />
      </IconButton>
      <AppBarContent3 classes={classes} />
    </Toolbar>
  </MuiAppBar>
)

export default AppBar
