import ContentFrame from './content-frame'
import Curation from './curation'
import history from 'ext/history'
import Outro from './outro'
import routes from 'app/routes'
import ScriptedChat from './scripted-chat'
import transition from 'ext/transition'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import Wrapper from './wrapper'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { h } from 'preact'
import { Router } from 'ext/simple-router'

const Content = ({ persona, isTransitioning, onRouteChange, onToggleContent }) => (
  <ContentFrame onToggleContent={onToggleContent}>
    <Wrapper>
      <Router history={history} onChange={onRouteChange}>
        <Curation isTransitioning={isTransitioning} onRouteChange={onRouteChange} path="/curation/:id*" />
        <ScriptedChat onToggleContent={onToggleContent} path="/scripted-chat/:id" persona={persona} />
        <Outro path="/outro/:id" persona={persona} />
      </Router>
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
      if (routes.isCuration(previousRoute) && routes.isSpotlight(route)) {
        setIsTransitioning(true)
        transition.liftElements()
        setTimeout(() => {
          setIsTransitioning(false)
          transition.clear()
        }, exitDuration + transition.duration)
      }
      return new Promise(resolve => setTimeout(resolve, exitDuration)) // delay new page so the exit animation is seen
    },
  }),
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  })
)(Content)
