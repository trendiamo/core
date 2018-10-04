import animateOnMount from 'shared/animate-on-mount'
import Frame from 'shared/frame'
import { h } from 'preact'
import history from './history'
import { Router } from 'ext/simple-router'
import styled from 'styled-components'
import transition from './transition'
import { width } from '../../config'
import { compose, withHandlers, withState } from 'recompose'
import { ContentRoot, CoverRoot } from './root'
import { ContentSpotlight, CoverSpotlight } from './spotlight'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'

const TrendiamoContentFrame = animateOnMount(styled(Frame)`
  border: 0;
  z-index: 2147483000;
  position: fixed;
  overflow-x: hidden;
  background-color: #fff;
  opacity: ${({ entry }) => (entry ? 0 : 1)};
  transform: ${({ entry }) => (entry ? 'translateY(20px)' : 'none')};
  transition: opacity 0.25s ease, transform 0.25s ease;

  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;

  @media (min-width: 600px) {
    border-radius: 8px;
    bottom: 100px;
    right: 30px;
    width: ${width}px;
    height: calc(100vh - 150px);
    box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
    max-height: 500px;
  }
`)

const Wrapper = styled.div`
  font-family: 'Roboto', sans-serif;
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
  font-size: 22px;
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

const Content = ({ isTransitioning, onRouteChange, routeToRoot, routeToSpotlight, website }) => (
  <TrendiamoContentFrame>
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
  </TrendiamoContentFrame>
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
