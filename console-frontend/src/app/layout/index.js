import AppBar from './app-bar'
import auth from 'auth'
import Menu from './menu'
import Onboarding from 'onboarding'
import React, { useEffect } from 'react'
import routes from 'app/routes'
import Sidebar from './sidebar'
import { branch, compose, lifecycle, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { styles } from './layout-styles'
import { useOnboarding } from 'ext/hooks/use-onboarding'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles'

const Layout = ({
  appBarContent,
  classes,
  children,
  hasScrolled,
  isWelcomePage,
  location,
  logout,
  sidebarOpen,
  toggleOpen,
}) => {
  const { store, setStore, onboardingReady } = useOnboarding(location)
  useEffect(() => setStore({ ...store, classes }), [classes])
  if (!onboardingReady) return null
  return (
    <div className={classes.root}>
      <div className={classes.appFrame}>
        <Onboarding />
        {!isWelcomePage && (
          <AppBar
            appBarContent={appBarContent}
            classes={classes}
            hasScrolled={hasScrolled}
            logout={logout}
            sidebarOpen={sidebarOpen}
            toggleOpen={toggleOpen}
          />
        )}
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
}

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
  withRouter,
  withHandlers({
    onWindowScroll: ({ setHasScrolled }) => () => setHasScrolled(window.scrollY > 2),
    toggleOpen: ({ sidebarOpen, setSidebarOpen }) => () => setSidebarOpen(!sidebarOpen),
  }),
  withStyles(styles, { index: 1 }),
  withProps(() => ({
    isLoggedIn: auth.isLoggedIn(),
    isAdminPage: window.location.pathname === routes.admin(),
    isWelcomePage: window.location.pathname === routes.root(),
  })),
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
