import AppBar from './app-bar'
import auth from 'auth'
import Menu from './menu'
import Onboarding from 'onboarding'
import React from 'react'
import routes from 'app/routes'
import Sidebar from './sidebar'
import withClasses from 'ext/recompose/with-classes'
import withOnboarding from 'ext/recompose/with-onboarding'
import { branch, compose, lifecycle, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { styles } from './layout-styles'
import { withStyles } from '@material-ui/core/styles'

const Layout = ({ appBarContent, children, classes, hasScrolled, logout, sidebarOpen, toggleOpen }) => (
  <div className={classes.root}>
    <div className={classes.appFrame}>
      <Onboarding />
      <AppBar
        appBarContent={appBarContent}
        classes={classes}
        hasScrolled={hasScrolled}
        logout={logout}
        sidebarOpen={sidebarOpen}
        toggleOpen={toggleOpen}
      />
      <main className={classes.contentWithSidebar}>
        <Sidebar classes={classes} sidebarOpen={sidebarOpen} toggleOpen={toggleOpen}>
          <Menu classes={classes} logout={logout} sidebarOpen={sidebarOpen} toggleOpen={toggleOpen} />
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
    <div className={classes.content}>
      <div className={classes.contentInnerDiv}>{children}</div>
    </div>
  </div>
)

const EnhancedLayout = compose(
  withState('hasScrolled', 'setHasScrolled', false),
  withState('sidebarOpen', 'setSidebarOpen', true),
  withOnboarding,
  withHandlers({
    onWindowScroll: ({ setHasScrolled }) => () => setHasScrolled(window.scrollY > 2),
    toggleOpen: ({ sidebarOpen, setSidebarOpen }) => () => setSidebarOpen(!sidebarOpen),
  }),
  withStyles(styles, { index: 1 }),
  withProps(() => ({
    isLoggedIn: auth.isLoggedIn(),
    isAdminPage: window.location.pathname === routes.admin(),
  })),
  withClasses,
  branch(
    ({ isLoggedIn, isAdminPage }) => !isLoggedIn || isAdminPage,
    renderComponent(props => <EmptyLayout {...props} />)
  ),
  lifecycle({
    componentDidMount() {
      const { onWindowScroll } = this.props
      window.addEventListener('scroll', onWindowScroll)
    },
    componentWillUnmount() {
      const { onWindowScroll } = this.props
      window.removeEventListener('scroll', onWindowScroll)
    },
  })
)(Layout)

export default EnhancedLayout
