import AppBar from './app-bar'
import auth from 'auth'
import CssBaseline from '@material-ui/core/CssBaseline'
import Menu from './menu'
import Onboarding from 'onboarding'
import React from 'react'
import Sidebar from './sidebar'
import withClasses from 'ext/recompose/with-classes'
import withOnboarding from 'ext/recompose/with-onboarding'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { styles } from './layout-styles'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles'

const Layout = ({
  appBarContent,
  children,
  classes,
  history,
  onboarding,
  logout,
  setOnboarding,
  sidebarOpen,
  toggleOpen,
}) => (
  <div className={classes.root}>
    <div className={classes.appFrame}>
      <Onboarding history={history} onboarding={onboarding} setOnboarding={setOnboarding} />
      <CssBaseline />
      <AppBar
        appBarContent={appBarContent}
        classes={classes}
        logout={logout}
        sidebarOpen={sidebarOpen}
        toggleOpen={toggleOpen}
      />
      <main className={classes.contentWithSidebar}>
        <Sidebar classes={classes} sidebarOpen={sidebarOpen} toggleOpen={toggleOpen}>
          <Menu classes={classes} logout={logout} sidebarOpen={sidebarOpen} />
        </Sidebar>
        <div className={classes.content}>
          <div className={classes.contentInnerDiv}>{children}</div>
        </div>
      </main>
    </div>
  </div>
)

const EmptyLayout = ({ classes, children }) => (
  <div className={classes.root}>
    <CssBaseline />
    <div className={classes.content}>
      <div className={classes.contentInnerDiv}>{children}</div>
    </div>
  </div>
)

const EnhancedLayout = compose(
  withState('sidebarOpen', 'setSidebarOpen', true),
  withOnboarding,
  withRouter,
  withHandlers({
    toggleOpen: ({ sidebarOpen, setSidebarOpen }) => () => setSidebarOpen(!sidebarOpen),
  }),
  withStyles(styles, { index: 1 }),
  withProps(() => ({
    isLoggedIn: auth.isLoggedIn(),
  })),
  withClasses,
  branch(({ isLoggedIn }) => !isLoggedIn, renderComponent(props => <EmptyLayout {...props} />))
)(Layout)

export default EnhancedLayout
