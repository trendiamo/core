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
`

const ContentNextToSidebar = styled(Content)`
  padding: 4px 14px 14px 14px;
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
  min-height: calc(100vh - 84px);
`

const FilledLayout = ({ children, location }) => {
  const onboardingReady = useOnboarding(location)

  const [hasScrolled, setHasScrolled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const isWelcomePage = useMemo(() => location.pathname === routes.welcome(), [location.pathname])
  const showOnboarding = useMemo(() => !auth.isAffiliate() && location.pathname !== routes.accounts(), [
    location.pathname,
  ])

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
        {!isWelcomePage && (
          <AppBar
            hasScrolled={hasScrolled}
            showOnboarding={showOnboarding}
            sidebarOpen={sidebarOpen}
            toggleOpen={toggleOpen}
          />
        )}
        <ContentWithSidebar>
          <Sidebar sidebarOpen={sidebarOpen} toggleOpen={toggleOpen} />
          <ContentNextToSidebar>{children}</ContentNextToSidebar>
        </ContentWithSidebar>
      </AppFrame>
    </Root>
  )
}

const Layout = ({ children, location }) => {
  if (!(auth.isLoggedIn() && auth.isAffiliate()) && !auth.getAccount()) return <EmptyLayout>{children}</EmptyLayout>

  return <FilledLayout location={location}>{children}</FilledLayout>
}

export default withRouter(Layout)
