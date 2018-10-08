import ContentFrame from './content-frame'
import { h } from 'preact'
import history from 'ext/history'
import { Router } from 'ext/simple-router'
import styled from 'styled-components'
import transition from './transition'
import { compose, withHandlers, withState } from 'recompose'
import { ContentRoot, CoverRoot } from './root'
import { ContentSpotlight, CoverSpotlight } from './spotlight'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Cover = styled.div`
  background-color: #232323;
  color: #fff;
  padding: 35px 20px 20px 20px;
  position: relative;
  min-height: 100px;
`

const InnerContent = styled.div`
  color: #333;
  padding: 1rem 1rem 0 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const PoweredBy = styled.div`
  color: #999;
  font-size: small;
  padding-top: 1.2rem;
  padding-bottom: 1rem;
  text-align: center;
  a {
    color: #5d69b9;
  }
`

const Flex1 = styled.div`
  flex: 1;
`

const GhostLayer = styled.div`
  visibility: ${({ isTransitioning }) => (isTransitioning ? 'visible' : 'hidden')};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const Content = ({ isTransitioning, onRouteChange, onToggleContent, routeToRoot, routeToSpotlight, website }) => (
  <ContentFrame onToggleContent={onToggleContent}>
    <Wrapper>
      <Cover>
        <Router history={history} onChange={onRouteChange}>
          <CoverRoot path={'/'} website={website} />
          <CoverSpotlight path={'/spotlight/:id'} routeToRoot={routeToRoot} website={website} />
        </Router>
      </Cover>
      <InnerContent>
        <Flex1>
          <Router history={history} onChange={onRouteChange}>
            <ContentRoot path={'/'} routeToSpotlight={routeToSpotlight} spotlights={website.spotlights} />
            <ContentSpotlight path={'/spotlight/:id'} website={website} />
          </Router>
        </Flex1>
        <PoweredBy>
          {'Trusted by '}
          <a href="https://trendiamo.com" rel="noopener noreferrer" target="_blank">
            {'trendiamo'}
          </a>
        </PoweredBy>
      </InnerContent>
      <GhostLayer isTransitioning={isTransitioning} ref={transition.setGhostRef} />
    </Wrapper>
  </ContentFrame>
)

export default compose(
  withState('isTransitioning', 'setIsTransitioning', false),
  withHandlers({
    onRouteChange: ({ setIsTransitioning }) => (previousRoute, route) => {
      if (!previousRoute) return
      const exitDuration = 300
      if (previousRoute === '/' && route.startsWith('/spotlight')) {
        setIsTransitioning(true)
        transition.liftElements()
        setTimeout(() => {
          setIsTransitioning(false)
          transition.clear()
        }, exitDuration + transition.duration)
      }
      return new Promise(resolve => setTimeout(resolve, exitDuration)) // delay new page so we can see the exit animation
    },
    routeToRoot: () => () => history.replace('/'),
    routeToSpotlight: () => spotlight => history.replace(`/spotlight/${spotlight.id}`),
  }),
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  })
)(Content)
