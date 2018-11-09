import ContentFrame from './content-frame'
import history from 'ext/history'
import routes from 'app/routes'
import styled from 'styled-components'
import transition from './transition'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { ContentRoot, CoverRoot } from './root'
import { ContentScriptedChat, CoverScriptedChat } from './scripted-chat'
import { ContentSpotlight, CoverSpotlight } from './spotlight'
import { h } from 'preact'
import { Router } from 'ext/simple-router'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  color: #333;
`

const Cover = styled.div`
  background-color: #232323;
  color: #fff;
  padding: 35px 20px 20px 20px;
  position: relative;
  min-height: 100px;
`

// const InnerContent = styled.div`
//   color: #333;
//   height: 100%;
//   height: 100%;
//   padding: 1rem 1rem 0 1rem;
//   display: flex;
//   flex-direction: column;
// `

// const PoweredBy = styled.div`
//   color: #999;
//   font-size: small;
//   padding-top: 1.2rem;
//   padding-bottom: 1rem;
//   text-align: center;
//   a {
//     color: #5d69b9;
//   }
// `
// <PoweredBy>
//   {'Trusted by '}
//   <a href="https://trendiamo.com" rel="noopener noreferrer" target="_blank">
//     {'trendiamo'}
//   </a>
// </PoweredBy>

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
          <CoverRoot path="/" website={website} />
          <CoverSpotlight path="/spotlight/:id" routeToRoot={routeToRoot} website={website} />
          <CoverScriptedChat path="/scripted-chat/:id" routeToRoot={routeToRoot} website={website} />
        </Router>
      </Cover>
      <Router history={history} onChange={onRouteChange}>
        <ContentRoot path="/" routeToSpotlight={routeToSpotlight} spotlights={website.spotlights} />
        <ContentSpotlight path="/spotlight/:id" website={website} />
        <ContentScriptedChat
          onToggleContent={onToggleContent}
          path="/scripted-chat/:id"
          routeToRoot={routeToRoot}
          website={website}
        />
      </Router>
      <GhostLayer isTransitioning={isTransitioning} ref={transition.setGhostRef} />
    </Wrapper>
  </ContentFrame>
)

export default compose(
  lifecycle({
    componentWillUnmount() {
      history.removeListeners()
    },
  }),
  withState('isTransitioning', 'setIsTransitioning', false),
  withHandlers({
    onRouteChange: ({ setIsTransitioning }) => (previousRoute, route) => {
      const exitDuration = 300
      if (previousRoute === '/' && routes.isSpotlight(route)) {
        setIsTransitioning(true)
        transition.liftElements()
        setTimeout(() => {
          setIsTransitioning(false)
          transition.clear()
        }, exitDuration + transition.duration)
      }
      return new Promise(resolve => setTimeout(resolve, exitDuration)) // delay new page so the exit animation is seen
    },
    routeToRoot: () => () => history.replace(routes.root()),
    routeToSpotlight: () => spotlight => history.replace(routes.spotlight(spotlight.id)),
  }),
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  })
)(Content)
