import ContentFrame from './content-frame'
import history from 'ext/history'
import routes from 'app/routes'
import transition from 'ext/transition'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import Wrapper from './wrapper'
import { cloneElement } from 'preact'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'
import { h } from 'preact'

const Content = ({ Component, onToggleContent }) => (
  <ContentFrame onToggleContent={onToggleContent}>
    <Wrapper>{Component}</Wrapper>
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
  withProps(({ Component, isTransitioning, onRouteChange, onToggleContent, persona }) => ({
    Component: cloneElement(Component, { isTransitioning, onRouteChange, onToggleContent, persona }),
  })),
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  })
)(Content)
