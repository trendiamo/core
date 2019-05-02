import AppBar from './app-bar'
import auth from 'auth'
import Menu from './menu'
import Onboarding from 'onboarding'
import React, { useEffect, useState } from 'react'
import routes from 'app/routes'
import Sidebar from './sidebar'
import styled from 'styled-components'
import { styles } from './layout-styles'
import { useOnboarding } from 'ext/hooks/use-onboarding'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles'

const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const EmptyLayout = ({ classes, children }) => (
  <div className={classes.root}>
    <div className={classes.content}>
      <InnerContent>{children}</InnerContent>
    </div>
  </div>
)

const FilledLayout = ({ appBarContent, classes, children, location, logout }) => {
  const { store, setStore, onboardingReady } = useOnboarding(location)
  useEffect(() => setStore({ ...store, classes }), [classes])

  const [hasScrolled, setHasScrolled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const isWelcomePage = window.location.pathname === routes.root()

  const onWindowScroll = () => setHasScrolled(window.scrollY > 2)
  const toggleOpen = () => setSidebarOpen(!sidebarOpen)

  useEffect(() => {
    window.addEventListener('scroll', onWindowScroll)
    return () => window.removeEventListener('scroll', onWindowScroll)
  }, [])

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

const Layout = props => {
  const isLoggedIn = auth.isLoggedIn()
  const isAdminPage = window.location.pathname === routes.admin()

  if (!isLoggedIn || isAdminPage) return <EmptyLayout {...props} />

  return <FilledLayout {...props} />
}

export default withRouter(withStyles(styles, { index: 1 })(Layout))
