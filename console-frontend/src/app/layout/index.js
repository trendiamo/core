import AppBar from './app-bar'
import auth from 'auth'
import Onboarding from 'onboarding'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import routes from 'app/routes'
import Sidebar from './sidebar'
import styled from 'styled-components'
import { useOnboarding } from 'ext/hooks/use-onboarding'
import { withRouter } from 'react-router'

const Root = styled.div`
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: fit-content;
  position: relative;
  width: 100%;
  z-index: 1;
`

const AppFrame = styled.div`
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
  padding: 14px;
  padding-top: 4px;
`

const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const EmptyLayout = ({ children }) => (
  <Root>
    <Content>
      <InnerContent>{children}</InnerContent>
    </Content>
  </Root>
)

const ContentWithSidebar = styled.main`
  display: flex;
  flex-grow: 1;
  min-height: 100vh;
`

const FilledLayout = ({ children, location, showOnboarding }) => {
  const onboardingReady = useOnboarding(location)

  const [hasScrolled, setHasScrolled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const isWelcomePage = useMemo(() => location.pathname === routes.welcome(), [location.pathname])

  const onWindowScroll = useCallback(() => setHasScrolled(window.scrollY > 2), [setHasScrolled])
  const toggleOpen = useCallback(() => setSidebarOpen(!sidebarOpen), [sidebarOpen])

  useEffect(
    () => {
      window.addEventListener('scroll', onWindowScroll)
      return () => window.removeEventListener('scroll', onWindowScroll)
    },
    [onWindowScroll]
  )

  if (!onboardingReady) return null

  return (
    <Root>
      <AppFrame>
        {showOnboarding && <Onboarding />}
        {!isWelcomePage && <AppBar hasScrolled={hasScrolled} sidebarOpen={sidebarOpen} toggleOpen={toggleOpen} />}
        <ContentWithSidebar>
          <Sidebar sidebarOpen={sidebarOpen} toggleOpen={toggleOpen} />
          <Content>
            <div>{children}</div>
          </Content>
        </ContentWithSidebar>
      </AppFrame>
    </Root>
  )
}

const Layout = ({ children, location }) => {
  const isAccountsPage = useMemo(() => location.pathname === routes.accounts(), [location.pathname])

  if (!auth.getAccount()) return <EmptyLayout>{children}</EmptyLayout>

  return (
    <FilledLayout location={location} showOnboarding={!isAccountsPage}>
      {children}
    </FilledLayout>
  )
}

export default withRouter(Layout)
