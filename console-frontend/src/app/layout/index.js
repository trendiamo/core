import AppBar from './app-bar'
import auth from 'auth'
import CssBaseline from '@material-ui/core/CssBaseline'
import Menu from './menu'
import Onboarding from 'onboarding'
import React from 'react'
import Sidebar from './sidebar'
import withClasses from 'ext/recompose/with-classes'
import withOnboarding from 'ext/recompose/with-onboarding'
import { branch, compose, lifecycle, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { styles } from './layout-styles'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles'

const Layout = ({
  appBarContent,
  children,
  classes,
  history,
  logout,
  sidebarOpen,
  toggleOpen,
  runOnboarding,
  setRunOnboarding,
  onboardingCallback,
}) => (
  <div className={classes.root}>
    <div className={classes.appFrame}>
      <Onboarding callback={onboardingCallback} history={history} run={runOnboarding} setRun={setRunOnboarding} />
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
  withState('runOnboarding', 'setRunOnboarding', false),
  withState('onboardingCallback', 'setOnboardingCallback', null),
  withProps(({ runOnboarding, setRunOnboarding, onboardingCallback, setOnboardingCallback }) => ({
    onboarding: {
      run: runOnboarding,
      setRun: setRunOnboarding,
      callback: onboardingCallback,
      setCallback: setOnboardingCallback,
    },
  })),
  withOnboarding,
  withRouter,
  withHandlers({
    toggleOpen: ({ sidebarOpen, setSidebarOpen }) => () => setSidebarOpen(!sidebarOpen),
    setOnboard: ({ setRunOnboarding }) => () => {
      setRunOnboarding(true)
    },
  }),
  withStyles(styles, { index: 1 }),
  withProps(() => ({
    isLoggedIn: auth.isLoggedIn(),
  })),
  withClasses,
  lifecycle({
    componentDidMount() {
      const { setRunOnboarding } = this.props
      setTimeout(() => {
        setRunOnboarding(() => auth.getUser().showOnboarding)
      }, 0)
    },
  }),
  branch(({ isLoggedIn }) => !isLoggedIn, renderComponent(props => <EmptyLayout {...props} />))
)(Layout)

export default EnhancedLayout
