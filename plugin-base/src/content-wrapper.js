import React from 'react'
import routes from 'routes'
import styled from 'styled-components'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { history, timeout, transition } from 'ext'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  @media (min-height: 500px) {
    overflow-y: hidden;
  }
  color: #333;
`

const ContentWrapper = ({ children, onRouteChange, onToggleContent, persona, isTransitioning }) => (
  <Wrapper>{React.cloneElement(children, { onRouteChange, onToggleContent, persona, isTransitioning })}</Wrapper>
)

export default compose(
  withState('isTransitioning', 'setIsTransitioning', false),
  lifecycle({
    componentWillUnmount() {
      history.removeListeners()
      timeout.clear('contentWrapper')
      timeout.clear('routeChange')
      transition.clear()
    },
  }),
  withHandlers({
    onRouteChange: ({ setIsTransitioning }) => (previousRoute, route) => {
      const exitDuration = 300
      if (routes.isShowcase(previousRoute) && routes.isSpotlight(route)) {
        setIsTransitioning(true)
        transition.liftElements()
        timeout.set(
          'contentWrapper',
          () => {
            setIsTransitioning(false)
            timeout.clear('contentWrapper')
            transition.clear()
          },
          exitDuration + transition.duration
        )
      }
      return exitDuration
    },
  })
)(ContentWrapper)
