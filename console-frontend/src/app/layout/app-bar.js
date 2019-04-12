import ArrowBack from '@material-ui/icons/ArrowBack'
import classNames from 'classnames'
import HelpOutline from '@material-ui/icons/HelpOutline'
import Link from 'shared/link'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import styled from 'styled-components'
import { branch, compose, renderNothing, withHandlers, withProps } from 'recompose'
import { Hidden, IconButton, AppBar as MuiAppBar, Toolbar, Typography } from '@material-ui/core'
import { withOnboardingConsumer } from 'ext/recompose/with-onboarding'
import { withStoreConsumer } from 'ext/recompose/with-store'

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

const OnboardingButtonTemplate = ({ handleClick }) => (
  <Hidden smDown>
    <StyledHelp onClick={handleClick}>
      <HelpOutline />
    </StyledHelp>
  </Hidden>
)

const OnboardingButton = compose(
  withOnboardingConsumer,
  withHandlers({
    handleClick: ({ onboarding, setOnboarding }) => () => {
      setOnboarding({ ...onboarding, help: { ...onboarding.help, run: true } })
    },
  }),
  branch(({ location, onboarding }) => location.pathname !== onboarding.help.pathname, renderNothing)
)(OnboardingButtonTemplate)

const Title = ({ text, classes, responsive, highlight }) => (
  <Typography
    className={classNames(classes.title, highlight && classes.titleHighlight, responsive && classes.titleResponsive)}
    variant="h6"
  >
    {text}
  </Typography>
)

const AppBarContent = compose(
  withStoreConsumer,
  branch(({ store }) => !store.appBarContent, renderNothing),
  withProps(({ store }) => ({
    Actions: store.appBarContent.Actions,
    backRoute: store.appBarContent.backRoute,
    title: store.appBarContent.title,
  }))
)(({ Actions, backRoute, classes, title }) => (
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
))

const AppBar = ({ classes, hasScrolled, sidebarOpen, toggleOpen }) => (
  <MuiAppBar
    className={classNames(classes.appBar, sidebarOpen && classes.appBarShift, hasScrolled && classes.appBarScroll)}
  >
    <Toolbar className={classes.topToolbar}>
      <IconButton aria-label="Open drawer" className={classes.menuButton} color="inherit" onClick={toggleOpen}>
        <MenuIcon />
      </IconButton>
      <AppBarContent classes={classes} />
    </Toolbar>
  </MuiAppBar>
)

export default AppBar
