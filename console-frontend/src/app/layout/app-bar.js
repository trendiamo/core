import Breadcrumbs from 'shared/breadcrumbs'
import classNames from 'classnames'
import HelpOutline from '@material-ui/icons/HelpOutline'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import styled from 'styled-components'
import { branch, compose, renderNothing, withHandlers, withProps } from 'recompose'
import { Hidden, IconButton, AppBar as MuiAppBar, Toolbar } from '@material-ui/core'
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

const AppBarContent = compose(
  withStoreConsumer,
  branch(({ store }) => !store.appBarContent, renderNothing),
  withProps(({ store }) => ({
    Actions: store.appBarContent.Actions,
    breadcrumbs: store.appBarContent.breadcrumbs,
  }))
)(({ Actions, breadcrumbs, classes }) => (
  <React.Fragment>
    <Breadcrumbs breadcrumbs={breadcrumbs} classes={classes} />
    {Actions && (
      <ButtonsContainer>
        {<OnboardingButton />}
        {Actions}
      </ButtonsContainer>
    )}
  </React.Fragment>
))

const AppBar = ({ classes, sidebarOpen, toggleOpen }) => (
  <MuiAppBar className={classNames(classes.appBar, sidebarOpen && classes.appBarShift)} position="absolute">
    <Toolbar className={classes.topToolbar}>
      <IconButton aria-label="Open drawer" className={classes.menuButton} color="inherit" onClick={toggleOpen}>
        <MenuIcon />
      </IconButton>
      <AppBarContent classes={classes} />
    </Toolbar>
  </MuiAppBar>
)

export default AppBar
